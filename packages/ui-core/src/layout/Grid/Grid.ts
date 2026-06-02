export interface GridOptions {
  columns?: number;
  gap?: string;
  responsive?: boolean;
}

export interface GridProps {
  options?: GridOptions;
}

export const Grid = {
  defaultOptions: {
    columns: 12,
    gap: '16px',
    responsive: true
  } as Required<GridOptions>
};
