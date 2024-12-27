import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 19.99,
    image: 'test-image.jpg'
  };

  test('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  test('handles add to cart action', () => {
    const mockAddToCart = jest.fn();
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart} 
      />
    );

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});