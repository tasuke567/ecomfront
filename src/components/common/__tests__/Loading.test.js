// src/components/common/__tests__/Loading.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner, SkeletonCard, LoadingButton } from '../Loading';

describe('Loading Components', () => {
  describe('Spinner Component', () => {
    test('renders with correct styles', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner.firstChild).toHaveClass(
        'animate-spin',
        'rounded-full',
        'h-8',
        'w-8',
        'border-b-2',
        'border-blue-600'
      );
    });

    test('renders with proper container alignment', () => {
      render(<Spinner />);
      const container = screen.getByRole('status');
      expect(container).toHaveClass('flex', 'justify-center', 'items-center', 'p-4');
    });
  });

  describe('SkeletonCard Component', () => {
    test('renders with animation class', () => {
      render(<SkeletonCard />);
      const card = screen.getByRole('article');
      expect(card).toHaveClass('animate-pulse');
    });

    test('renders all placeholder elements', () => {
      render(<SkeletonCard />);
      const placeholders = screen.getAllByRole('article');
      
      // Main container
      expect(placeholders[0]).toHaveClass('border', 'rounded-lg', 'p-4', 'w-full');
      
      // Image placeholder
      const imagePlaceholder = screen.getByTestId('image-placeholder');
      expect(imagePlaceholder).toHaveClass('h-48', 'bg-gray-200', 'rounded', 'mb-4');
      
      // Text placeholders
      const textPlaceholders = screen.getAllByTestId('text-placeholder');
      expect(textPlaceholders[0]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-3/4', 'mb-2');
      expect(textPlaceholders[1]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-1/2');
    });
  });

  describe('LoadingButton Component', () => {
    const defaultProps = {
      children: 'Submit',
      onClick: jest.fn()
    };

    test('renders normal state correctly', () => {
      render(<LoadingButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveTextContent('Submit');
      expect(button).toHaveClass('bg-indigo-600', 'hover:bg-indigo-700');
      expect(button).not.toBeDisabled();
    });

    test('renders loading state correctly', () => {
      render(<LoadingButton {...defaultProps} isLoading />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveTextContent('Processing...');
      expect(button).toHaveClass('bg-indigo-400', 'cursor-not-allowed');
      expect(button).toBeDisabled();
      expect(screen.getByRole('status')).toBeInTheDocument(); // spinner
    });

    test('shows spinner in loading state', () => {
      render(<LoadingButton {...defaultProps} isLoading />);
      const spinner = screen.getByRole('status');
      
      expect(spinner).toHaveClass('animate-spin');
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    test('maintains proper button styling', () => {
      render(<LoadingButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass(
        'w-full',
        'flex',
        'justify-center',
        'py-2',
        'px-4',
        'border',
        'border-transparent',
        'rounded-md',
        'shadow-sm',
        'text-sm',
        'font-medium',
        'text-white'
      );
    });

    test('applies focus styles', () => {
      render(<LoadingButton {...defaultProps} />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-indigo-500'
      );
    });

    test('handles additional props', () => {
      render(
        <LoadingButton
          {...defaultProps}
          type="submit"
          className="custom-class"
          data-testid="submit-button"
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveAttribute('data-testid', 'submit-button');
    });
  });
});