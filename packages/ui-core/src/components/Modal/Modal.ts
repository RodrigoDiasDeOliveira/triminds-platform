export interface ModalProps {
  title: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const Modal = {
  defaultProps: {
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel'
  } as Required<Pick<ModalProps, 'confirmLabel' | 'cancelLabel'>>
};
