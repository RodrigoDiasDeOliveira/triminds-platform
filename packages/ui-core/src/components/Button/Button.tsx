import { ButtonProps } from './Button.types';
import { buttonStyles } from './Button.styles';

export const Button = {
  defaultProps: {
    variant: 'primary',
    disabled: false
  } as Required<Pick<ButtonProps, 'variant' | 'disabled'>>,
  styles: buttonStyles
};
