import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Cooking Agent--pro brand', () => {
  render(<App />);
  const brand = screen.getByText(/Smart Chef--pro/i);
  expect(brand).toBeInTheDocument();
});
