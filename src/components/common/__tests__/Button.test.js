// src/components/common/__tests__/Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Click me',
    onClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default variant (primary)', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-600', 'text-white', 'hover:bg-primary-700');
  });

  test('renders with different variants', () => {
    const variants = {
      primary: ['bg-primary-600', 'text-white', 'hover:bg-primary-700'],
      secondary: ['bg-gray-200', 'text-gray-800', 'hover:bg-gray-300'],
      danger: ['bg-red-600', 'text-white', 'hover:bg-red-700']
    };

    Object.entries(variants).forEach(([variant, classes]) => {
      const { rerender } = render(
        <Button variant={variant}>Click me</Button>
      );
      const button = screen.getByRole('button');
      classes.forEach(className => {
        expect(button).toHaveClass(className);
      });
      rerender(<></>);
    });
  });

  test('applies base styles to all buttons', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-4', 'py-2', 'rounded-lg', 'transition-colors');
  });

  test('handles click events', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('spreads additional props to button element', () => {
    render(
      <Button {...defaultProps} type="submit" disabled data-testid="test-button">
        Click me
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('data-testid', 'test-button');
  });

  test('renders children correctly', () => {
    const children = (
      <span data-testid="child-element">
        <img src="icon.png" alt="icon" />
        Click me
      </span>
    );
    
    render(<Button>{children}</Button>);
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  test('combines custom className with default classes', () => {
    render(
      <Button {...defaultProps} className="custom-class">
        Click me
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('px-4', 'py-2', 'rounded-lg');
  });
});