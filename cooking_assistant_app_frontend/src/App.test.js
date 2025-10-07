import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Cooking Agent Pro brand', () => {
  render(<App />);
  const heading = screen.getByText(/Smart Cooking Agent Pro/i);
  expect(heading).toBeInTheDocument();
});
