import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <h1 class="text-3xl underline font-inter">
      Hello World! How are you? Have a good day.
    </h1>
  `,
})
export class AppComponent {
  title = 'jk-doc-manager';
}
