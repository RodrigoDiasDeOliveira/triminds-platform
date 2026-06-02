export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface NavigationPattern {
  name: string;
  description: string;
  items: NavigationItem[];
}

export const defaultNavigationPattern: NavigationPattern = {
  name: 'default-navigation',
  description: 'A standard application navigation pattern for sidebars and top menus.',
  items: [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Reports', path: '/reports' }
  ]
};
