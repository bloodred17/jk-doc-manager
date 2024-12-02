import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
} from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

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
        <div class="p-8 xl:p-12 space-y-4" [formGroup]="signInForm">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              formControlName="email"
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
              formControlName="password"
            />
          </label>

          <div class="flex justify-between">
            <div class="form-control">
              <label class="label cursor-pointer space-x-2">
                <input
                  type="checkbox"
                  class="toggle"
                  checked="checked"
                  formControlName="rememberMe"
                />
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

          <button
            class="btn w-full space-x-1 bg-base-100"
            (click)="signInWithGoogle()"
          >
            <svg-icon
              src="/google.svg"
              [svgStyle]="{ 'width.px': 20 }"
            ></svg-icon>
            <span>Sign In with Google</span>
          </button>

          <div class="flex justify-end">
            <a
              class="font-inter text-sm cursor-pointer hover:underline"
              [routerLink]="['/sign-up']"
            >
              Create New
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [SvgIconComponent, ReactiveFormsModule, RouterLink],
  standalone: true,
})
export class SignInComponent {
  authService = inject(AuthService);
  firebaseService = inject(FirebaseService);

  router = inject(Router);

  signInForm = new FormGroup({
    email: new FormControl('', []),
    password: new FormControl('', []),
    rememberMe: new FormControl(false),
  });

  token = '';

  authenticate() {
    const auth = getAuth();
    console.log(this.signInForm);
    // if (this.signInForm.value.email && this.signInForm.value.password) {
    signInWithEmailAndPassword(
      auth,
      // this.signInForm.value.email,
      // this.signInForm.value.password
      'ankur.611@gmail.com',
      'some_password'
    ).then(async (cred) => {
      const { user } = cred;
      const idToken = await user.getIdToken();
      const csrfToken = 'abcd123';

      this.authService.login({ idToken, csrfToken }).subscribe((res: any) => {
        this.router.navigate(['/']);
      });
    });
    // }
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).then(async (result) => {
      const idToken = await getIdToken(result.user);
      const csrfToken = 'abcd123';
      this.authService.login({ idToken, csrfToken }).subscribe((res: any) => {
        this.router.navigate(['/']);
      });
    });
  }
}
