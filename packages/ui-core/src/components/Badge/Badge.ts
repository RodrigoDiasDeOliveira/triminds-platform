export interface BadgeProps {
  label: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export const Badge = {
  defaultProps: {
    tone: 'default'
  } as Required<Pick<BadgeProps, 'tone'>>
};
