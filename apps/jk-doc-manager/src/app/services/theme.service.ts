import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.setTheme(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener('change', e => {
      this.setTheme(e.matches);
    });
  }

  private setTheme(isDark: boolean) {
    this.isDarkMode.next(isDark);
  }

  setDomTheme(isDark: boolean) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dracula' : 'cmyk');
  }
}
