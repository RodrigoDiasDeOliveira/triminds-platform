export interface CardProps {
  title: string;
  content: string;
  footer?: string;
  accentColor?: string;
}

export const Card = {
  defaultProps: {
    accentColor: '#E5E7EB'
  } as Required<Pick<CardProps, 'accentColor'>>
};
