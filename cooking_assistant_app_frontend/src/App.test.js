import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Cooking brand', () => {
  render(<App />);
  const heading = screen.getByText(/Smart Cooking/i);
  expect(heading).toBeInTheDocument();
});
