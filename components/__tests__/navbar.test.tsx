import { render, screen } from '@testing-library/react';
import { Navbar } from '../navbar';

describe('Navbar', () => {
  it('renders Login link', () => {
    render(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
