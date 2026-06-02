export interface DashboardPatternProps {
  title?: string;
  showSidebar?: boolean;
}

export const DashboardPattern = {
  defaultProps: {
    title: 'Dashboard',
    showSidebar: true
  } as Required<DashboardPatternProps>
};
