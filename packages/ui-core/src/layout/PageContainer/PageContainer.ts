export interface PageContainerProps {
  maxWidth?: string;
  padding?: string;
  centered?: boolean;
}

export const PageContainer = {
  defaultProps: {
    maxWidth: '1200px',
    padding: '24px',
    centered: true
  } as Required<PageContainerProps>
};
