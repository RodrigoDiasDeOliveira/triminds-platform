export type ThemeDensity = 'compact' | 'comfortable' | 'wide';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  density: ThemeDensity;
  radius: number;
}

export const baseTheme: Theme = {
  name: 'base',
  primary: '#2563EB',
  secondary: '#0EA5E9',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#0F172A',
  density: 'comfortable',
  radius: 10
};
