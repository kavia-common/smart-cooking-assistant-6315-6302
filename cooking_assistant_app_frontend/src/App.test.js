import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cHEF brand', () => {
  render(<App />);
  const heading = screen.getByText(/cHEF/i);
  expect(heading).toBeInTheDocument();
});
