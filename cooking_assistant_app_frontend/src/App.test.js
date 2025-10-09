import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Chef brand', () => {
  render(<App />);
  const heading = screen.getByText(/Smart Chef/i);
  expect(heading).toBeInTheDocument();
});
