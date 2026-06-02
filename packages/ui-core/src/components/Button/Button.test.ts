import { Button } from './Button';

test('button default props', () => {
  expect(Button.defaultProps.variant).toBe('primary');
  expect(Button.defaultProps.disabled).toBe(false);
});
