import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="flex justify-center items-center h-screen bg-base-300">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 shadow-xl rounded-xl bg-base-200"
      >
        <div
          style="background-image: url('/sign-in.jpg')"
          class="bg-cover rounded-l-lg"
        ></div>
        <div class="p-8 xl:p-12 space-y-4">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
            />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              class="input input-bordered w-full"
            />
          </label>

          <div class="flex justify-between">
            <div class="form-control">
              <label class="label cursor-pointer space-x-2">
                <input type="checkbox" class="toggle" checked="checked" />
                <span class="label-text">Remember me</span>
              </label>
            </div>
            <div class="w-20"></div>
            <div class="flex items-center">
              <div class="font-inter text-xs cursor-pointer hover:underline">
                Forgot password?
              </div>
            </div>
          </div>

          <button class="btn w-full bg-base-100" (click)="authenticate()">
            Login
          </button>

          <button class="btn w-full space-x-1" (click)="authenticate()">
            <svg-icon
              src="/google.svg"
              [svgStyle]="{ 'width.px': 20 }"
            ></svg-icon>
            <span>Login with Google</span>
          </button>

          <div class="flex justify-end">
            <div class="font-inter text-sm cursor-pointer hover:underline">
              Create New
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [SvgIconComponent],
  standalone: true,
})
export class SignInComponent {
  authService = inject(AuthService);
  router = inject(Router);

  authenticate() {
    this.authService.isAuthenticated = true;
    this.router.navigate(['/']);
  }
}
