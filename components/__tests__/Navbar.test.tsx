import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { CartProvider } from '@/app/context/CartContext';

describe('Navbar Component', () => {
  it('renders the navbar', () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>
    );

    const drawer = screen.getByTestId('drawer');
    fireEvent.click(drawer);


    expect(screen.getByText('Store')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });
});