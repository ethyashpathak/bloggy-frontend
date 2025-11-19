// Simple theme utilities for dark mode
const THEME_KEY = 'theme';

export function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme() {
  const next = getStoredTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

// Initialize early (optional manual call in main entry if SSR etc.)
export function initTheme() {
  applyTheme(getStoredTheme());
}
