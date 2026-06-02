import { ButtonVariant } from './Button.types';

export const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'background: #2563EB; color: #FFF; border: none;',
  secondary: 'background: #E0E7FF; color: #1E293B; border: 1px solid #CBD5E1;',
  ghost: 'background: transparent; color: #2563EB; border: 1px solid transparent;'
};
