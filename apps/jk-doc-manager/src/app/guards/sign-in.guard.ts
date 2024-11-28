import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const signInGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const loginPath = router.parseUrl("/login");
  if (authService.isAuthenticated) {
    return true;
  }
  return new RedirectCommand(loginPath, {
    skipLocationChange: true,
  });
  // return router.navigate(['/login']);
}
