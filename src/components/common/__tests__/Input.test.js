// src/components/common/__tests__/Input.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input Component', () => {
  const defaultProps = {
    name: 'test-input',
    type: 'text',
    onChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input with label when provided', () => {
    render(<Input {...defaultProps} label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toHaveClass('input-field');
  });

  test('does not render label when not provided', () => {
    render(<Input {...defaultProps} />);
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  test('applies correct label styling', () => {
    render(<Input {...defaultProps} label="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('block', 'text-sm', 'font-medium', 'text-gray-700');
  });

  test('shows error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<Input {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-sm', 'text-red-600');
  });

  test('handles user input correctly', async () => {
    const onChange = jest.fn();
    render(<Input {...defaultProps} onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test input');
    
    expect(onChange).toHaveBeenCalledTimes(10); // Once for each character
    expect(input.value).toBe('test input');
  });

  test('spreads additional props to input element', () => {
    render(
      <Input
        {...defaultProps}
        placeholder="Enter text"
        disabled
        maxLength={50}
        data-testid="test-input"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('maxLength', '50');
    expect(input).toHaveAttribute('data-testid', 'test-input');
  });

  test('maintains proper spacing in wrapper div', () => {
    render(<Input {...defaultProps} />);
    const wrapper = screen.getByRole('textbox').parentElement;
    expect(wrapper).toHaveClass('space-y-1');
  });

  test('handles different input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel'];
    
    types.forEach(type => {
      const { rerender } = render(<Input {...defaultProps} type={type} />);
      const input = screen.getByRole(type === 'number' ? 'spinbutton' : 'textbox');
      expect(input).toHaveAttribute('type', type);
      rerender(<></>);
    });
  });

  test('forward refs correctly', () => {
    const ref = React.createRef();
    render(<Input {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('handles focus and blur events', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    
    render(<Input {...defaultProps} onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});