import { Route } from '@angular/router';
import { HomeComponent } from './views/home.component';
import { signInGuard } from './guards/sign-in.guard';
import { SignInComponent } from './views/sign-in.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [signInGuard]
  }
];
