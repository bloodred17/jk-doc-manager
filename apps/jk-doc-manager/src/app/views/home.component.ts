import { Component } from '@angular/core';
import { Home, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home',
  template: `
    <div>
      This is Home
      <lucide-icon [img]="Home" class="my-icon"></lucide-icon>
    </div>
  `,
  standalone: true,
  imports: [LucideAngularModule],
})
export class HomeComponent {
  protected readonly Home = Home;
}
