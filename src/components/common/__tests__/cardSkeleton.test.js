// src/components/common/__tests__/cartSkeleton.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import cartSkeleton from '../cartSkeleton';

describe('cartSkeleton Component', () => {
  test('renders with correct container styles', () => {
    render(<cartSkeleton />);
    const container = screen.getByTestId('cart-skeleton');
    expect(container).toHaveClass(
      'max-w-7xl',
      'mx-auto',
      'px-4',
      'py-4',
      'md:py-8',
      'animate-pulse'
    );
  });

  test('renders title placeholder with correct styles', () => {
    render(<cartSkeleton />);
    const titlePlaceholder = screen.getByTestId('title-placeholder');
    expect(titlePlaceholder).toHaveClass(
      'h-8',
      'bg-gray-200',
      'rounded',
      'w-48',
      'mb-8'
    );
  });

  test('renders correct number of item placeholders', () => {
    render(<cartSkeleton />);
    const itemPlaceholders = screen.getAllByTestId('item-placeholder');
    expect(itemPlaceholders).toHaveLength(3);
  });

  test('renders item placeholders with correct structure', () => {
    render(<cartSkeleton />);
    const itemPlaceholders = screen.getAllByTestId('item-placeholder');
    
    itemPlaceholders.forEach(item => {
      // Image placeholder
      const imagePlaceholder = item.querySelector('[data-testid="image-placeholder"]');
      expect(imagePlaceholder).toHaveClass('w-24', 'h-24', 'bg-gray-200', 'rounded-lg');

      // Text placeholders
      const textPlaceholders = item.querySelectorAll('[data-testid="text-placeholder"]');
      expect(textPlaceholders[0]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-3/4', 'mb-2');
      expect(textPlaceholders[1]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-1/4', 'mb-4');
    });
  });

  test('renders summary placeholder with correct structure', () => {
    render(<cartSkeleton />);
    const summaryPlaceholder = screen.getByTestId('summary-placeholder');
    
    expect(summaryPlaceholder).toHaveClass('bg-white', 'rounded-lg', 'shadow-sm', 'p-6', 'h-fit');
    
    // Title placeholder
    const titlePlaceholder = summaryPlaceholder.querySelector('[data-testid="summary-title-placeholder"]');
    expect(titlePlaceholder).toHaveClass('h-6', 'bg-gray-200', 'rounded', 'w-1/2', 'mb-6');
  })
})
        