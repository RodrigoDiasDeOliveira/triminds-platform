export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBreadcrumbs?: boolean;
}

export const Header = {
  defaultProps: {
    showBreadcrumbs: false
  } as Required<Pick<HeaderProps, 'showBreadcrumbs'>>
};
