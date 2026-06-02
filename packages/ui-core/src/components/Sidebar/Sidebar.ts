export interface SidebarItem {
  label: string;
  icon?: string;
  path: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  collapsed?: boolean;
  activePath?: string;
}

export const Sidebar = {
  defaultProps: {
    collapsed: false
  } as Required<Pick<SidebarProps, 'collapsed'>>
};
