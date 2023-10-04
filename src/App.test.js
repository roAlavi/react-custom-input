import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Type Username Here placeholder', () => {
  render(<App />);
  const linkElement = screen.getByText(/Type Username Here/i);
  expect(linkElement).toBeInTheDocument();
});
