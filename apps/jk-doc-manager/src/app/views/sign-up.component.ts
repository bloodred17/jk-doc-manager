import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  template: `
    <div class="flex justify-center items-center h-screen bg-base-300">
      <div class="grid grid-cols-1 shadow-xl rounded-xl bg-base-200">
        <div class="p-8 xl:p-12 space-y-1" [formGroup]="signUpForm">
          <!--          (ngSubmit)="signUp()"-->
          <!--          Not Sure why ngSubmit is not working -->
          <div class="flex justify-center">
            <h1 class="text-3xl font-inter">Sign Up</h1>
          </div>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              formControlName="displayName"
            />
          </label>
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
            <div class="label">
              @let email = signUpForm.controls.email; @if (email?.errors &&
              email?.dirty) { @if (email?.getError('required')) {
              <span class="label-text text-error">Email is required</span>
              } @else if (email?.getError('email') || null) {
              <span class="label-text text-error">Invalid email</span>}}
            </div>
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
            <div class="label">
              @let password = signUpForm.controls.password; @if
              (password?.errors && password?.dirty) { @if
              (password?.getError('required')) {
              <span class="label-text-alt text-error"
                >Password is Required</span
              >
              } @else if (password?.getError('pattern') || null) {
              <span class="label-text-alt text-error"
                >Password should have lowercase and uppercase letters with
                digits</span
              >
              } @else if (password?.getError('minlength') || null) {
              <span class="label-text-alt text-error"
                >Password should be minimum 6 characters</span
              >
              }}
            </div>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              class="input input-bordered w-full"
              formControlName="confirmPassword"
            />
          </label>
          <div class="flex justify-center h-10">
            @if (signUpForm.errors && signUpForm.getError('passwordMismatch')) {
            <span class="text-error text-sm">Passwords don't match</span>
            } @if (error) {
            <span class="text-error text-sm">{{ error }}</span>
            }
          </div>
          <div class="pt-3">
            <button
              class="btn w-full bg-base-100"
              type="submit"
              (click)="signUp()"
              [disabled]="!signUpForm.valid"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SignUpComponent {
  authService = inject(AuthService);
  router = inject(Router);
  passwordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  };

  signUpForm = new FormGroup(
    {
      displayName: new FormControl('User', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [this.passwordValidator]
  );
  error = '';
  signUp() {
    console.log('here');
    const payload = { ...this.signUpForm.value };
    delete payload.confirmPassword;
    // const payload = {
    //   displayName: this.signUpForm.value.displayName,
    //   email: 'ankur@tatxtion.tech',
    //   password: 'f888Hc61',
    // };
    this.authService.signUp(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response?.error) {
          this.error = response.error?.replace('Error: ', '');
        } else {
          this.router.navigate(['/sign-in']);
        }
      },
      error: (error) => {
        this.error = error;
      },
    });
  }
}
