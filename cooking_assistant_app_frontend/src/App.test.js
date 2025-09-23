import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Cooking Agent brand', () => {
  render(<App />);
  const heading = screen.getByText(/Smart Cooking Agent/i);
  expect(heading).toBeInTheDocument();
});
