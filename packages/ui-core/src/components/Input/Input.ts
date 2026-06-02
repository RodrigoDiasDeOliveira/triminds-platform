export interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search';
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const Input = {
  defaultProps: {
    placeholder: '',
    type: 'text',
    disabled: false
  } as Required<Pick<InputProps, 'placeholder' | 'type' | 'disabled'>>
};
