import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Cooking Agent --pro brand', () => {
  render(<App />);
  const heading = screen.getByText(/Smart Cooking Agent --pro/i);
  expect(heading).toBeInTheDocument();
});
