// src/components/common/__tests__/Alert.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert Component', () => {
  const defaultProps = {
    message: 'Test message',
    type: 'info'
  };

  test('renders with default type (info)', () => {
    render(<Alert message="Test message" />);
    const alert = screen.getByText('Test message');
    expect(alert.parentElement).toHaveClass('bg-blue-100', 'text-blue-800', 'border-blue-200');
  });

  test('renders different alert types with correct styles', () => {
    const types = {
      success: ['bg-green-100', 'text-green-800', 'border-green-200'],
      error: ['bg-red-100', 'text-red-800', 'border-red-200'],
      warning: ['bg-yellow-100', 'text-yellow-800', 'border-yellow-200'],
      info: ['bg-blue-100', 'text-blue-800', 'border-blue-200']
    };

    Object.entries(types).forEach(([type, classes]) => {
      const { rerender } = render(<Alert {...defaultProps} type={type} />);
      const alert = screen.getByText('Test message');
      classes.forEach(className => {
        expect(alert.parentElement).toHaveClass(className);
      });
      rerender(<></>);
    });
  });

  test('displays the close button when onClose is provided', () => {
    const onClose = jest.fn();
    render(<Alert {...defaultProps} onClose={onClose} />);
    
    const closeButton = screen.getByRole('img', { hidden: true });
    expect(closeButton).toBeInTheDocument();
  });

  test('does not display close button when onClose is not provided', () => {
    render(<Alert {...defaultProps} />);
    const svg = document.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Alert {...defaultProps} onClose={onClose} />);
    
    const closeButton = screen.getByRole('img', { hidden: true }).parentElement;
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('renders with the correct base layout classes', () => {
    render(<Alert {...defaultProps} />);
    const alert = screen.getByText('Test message').parentElement;
    expect(alert).toHaveClass('border', 'px-4', 'py-3', 'rounded', 'relative', 'mb-4');
  });

  test('renders message with appropriate text styling', () => {
    render(<Alert {...defaultProps} />);
    const messageElement = screen.getByText('Test message');
    expect(messageElement).toHaveClass('block', 'sm:inline');
  });

  test('handles HTML content in message prop', () => {
    const htmlMessage = <span data-testid="html-content">HTML Message</span>;
    render(<Alert {...defaultProps} message={htmlMessage} />);
    expect(screen.getByTestId('html-content')).toBeInTheDocument();
  });

  test('close button has correct positioning styles', () => {
    const onClose = jest.fn();
    render(<Alert {...defaultProps} onClose={onClose} />);
    
    const closeButton = screen.getByRole('img', { hidden: true }).parentElement;
    expect(closeButton).toHaveClass('absolute', 'top-0', 'bottom-0', 'right-0', 'px-4', 'py-3');
  });
});