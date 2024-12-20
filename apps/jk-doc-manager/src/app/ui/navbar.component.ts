import { Component, inject, Input, signal } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { RouterLink } from '@angular/router';
import { LogOut, LucideAngularModule, User, UserCog } from 'lucide-angular';
import { ThemeToggleComponent } from './theme-toggle.component';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  template: `
    <div
      class="navbar backdrop-blur-md bg-white/30 rounded-lg shadow-lg border border-white/20"
    >
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            @for (menuItem of appStateService.appMenu; track menuItem) {
            <li>
              <a [routerLink]="menuItem.route" class="flex justify-between">
                <span>
                  {{ menuItem.label }}
                </span>
                @if (menuItem?.icon) {
                <lucide-icon
                  [img]="menuItem.icon"
                  class="w-4 h-4"
                ></lucide-icon>
                }
              </a>
            </li>
            }
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="text-xl font-inter cursor-pointer" [routerLink]="['/']">
          <span class="text-pink-600 text-bold">#</span>
          <span>DocMan</span>
        </a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <lucide-icon [img]="User" class="w-5 h-5"></lucide-icon>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a [routerLink]="['/profile']" class="flex justify-between">
                <span> Profile </span>
                <lucide-icon [img]="UserCog" class="w-4 h-4"></lucide-icon>
              </a>
            </li>
            <li>
              <div (click)="authService.signOut()" class="flex justify-between">
                <span> Log Out </span>
                <lucide-icon [img]="LogOut" class="w-4 h-4"></lucide-icon>
              </div>
            </li>
          </ul>
        </div>
        <app-theme-toggle></app-theme-toggle>
        <!--        <button class="btn btn-ghost btn-circle">-->
        <!--          <div class="indicator">-->
        <!--            <svg-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--              class="h-5 w-5"-->
        <!--              fill="none"-->
        <!--              viewBox="0 0 24 24"-->
        <!--              stroke="currentColor"-->
        <!--            >-->
        <!--              <path-->
        <!--                stroke-linecap="round"-->
        <!--                stroke-linejoin="round"-->
        <!--                stroke-width="2"-->
        <!--                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"-->
        <!--              />-->
        <!--            </svg>-->
        <!--            <span class="badge badge-xs badge-primary indicator-item"></span>-->
        <!--          </div>-->
        <!--        </button>-->
      </div>
    </div>
  `,
  host: {
    '[class]': '_class()',
  },
  imports: [RouterLink, LucideAngularModule, ThemeToggleComponent],
})
export class NavbarComponent {
  appStateService = inject(AppStateService);
  authService = inject(AuthService);
  readonly _class = signal('');
  @Input()
  set class(classes: string) {
    this._class.set(classes);
  }

  protected readonly User = User;
  protected readonly UserCog = UserCog;
  protected readonly LogOut = LogOut;
}
