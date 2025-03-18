import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Use signals for theme state management
  private readonly STORAGE_KEY = 'theme-preference';
  private readonly LIGHT_THEME = 'rose-red';
  private readonly DARK_THEME = 'magenta-violet';

  // Initialize with saved theme or default to light
  public theme = signal<string>(this.getInitialTheme());
  public isDarkTheme = signal<boolean>(
    this.getInitialTheme() === this.DARK_THEME
  );

  constructor() {
    // Set up an effect to apply theme changes
    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  toggleTheme(): void {
    const newTheme = this.isDarkTheme() ? this.LIGHT_THEME : this.DARK_THEME;
    this.theme.set(newTheme);
    this.isDarkTheme.set(!this.isDarkTheme());
    this.saveTheme(newTheme);
  }

  private getInitialTheme(): string {
    // Check for saved preference, default to light theme
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    return savedTheme === this.DARK_THEME ? this.DARK_THEME : this.LIGHT_THEME;
  }

  private saveTheme(theme: string): void {
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  private applyTheme(theme: string): void {
    // Remove any existing theme link
    document.getElementById('app-theme')?.remove();

    // Create and append the new theme link
    const link = document.createElement('link');
    link.id = 'app-theme';
    link.rel = 'stylesheet';
    link.href = `/${theme}.css`; // The path should match the output in angular.json
    document.head.appendChild(link);

    // Store theme in localStorage
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Set body class for additional theme-based styling if needed
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(
      theme === this.LIGHT_THEME ? 'light-theme' : 'dark-theme'
    );
  }
}
