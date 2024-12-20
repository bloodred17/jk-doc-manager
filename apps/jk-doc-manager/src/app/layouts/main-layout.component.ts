import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../ui/navbar.component';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  template: `
    <app-navbar class="sticky top-0 z-50"></app-navbar>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, NavbarComponent],
})
export class MainLayoutComponent {}
