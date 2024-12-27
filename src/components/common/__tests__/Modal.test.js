// src/components/common/__tests__/Modal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <div>Modal content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  test('renders modal content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('renders with correct backdrop styles', () => {
    render(<Modal {...defaultProps} />);
    const backdrop = screen.getByText('Test Modal').closest('div');
    expect(backdrop).toHaveClass(
      'fixed',
      'inset-0',
      'bg-black',
      'bg-opacity-50',
      'z-50',
      'flex',
      'items-center',
      'justify-center'
    );
  });

  test('has proper modal container styles', () => {
    render(<Modal {...defaultProps} />);
    const modalContainer = screen.getByText('Test Modal').closest('.bg-white');
    expect(modalContainer).toHaveClass(
      'bg-white',
      'rounded-lg',
      'w-full',
      'max-w-md',
      'mx-4'
    );
  });

})