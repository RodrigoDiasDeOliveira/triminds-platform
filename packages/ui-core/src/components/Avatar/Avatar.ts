export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = {
  defaultProps: {
    size: 'md'
  } as Required<Pick<AvatarProps, 'size'>>
};
