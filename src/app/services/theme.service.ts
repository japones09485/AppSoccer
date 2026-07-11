import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = true;
  private readonly KEY = 'soccer-theme';

  constructor() {
    const saved = localStorage.getItem(this.KEY);
    this.isDark = saved !== null ? saved === 'dark' : true;
    this.apply();
  }

  toggle(): void {
    this.isDark = !this.isDark;
    localStorage.setItem(this.KEY, this.isDark ? 'dark' : 'light');
    this.apply();
  }

  private apply(): void {
    document.documentElement.classList.toggle('dark', this.isDark);
  }
}
