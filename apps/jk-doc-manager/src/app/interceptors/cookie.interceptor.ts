import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function cookieInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const authService = inject(AuthService);
  const newReq = req.clone({
    headers: req.headers.append('X-Session-ID', authService.sessionID),
  });
  return next(newReq);
}
