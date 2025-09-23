import { render, screen } from '@testing-library/react';
import App from './App';

test('renders smart chef brand', () => {
  render(<App />);
  const heading = screen.getByText(/smart chef/i);
  expect(heading).toBeInTheDocument();
});
