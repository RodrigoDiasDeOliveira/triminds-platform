export interface SidebarState {
  isOpen: boolean;
}

export const useSidebar = () => {
  let state: SidebarState = { isOpen: true };

  return {
    state,
    toggle: () => {
      state = { isOpen: !state.isOpen };
      return state;
    }
  };
};
