// src/components/common/__tests__/Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders footer with correct background color', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('bg-gray-800');
  });

  test('renders footer with correct text color', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('text-white');
  });

  test('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 E-Shop\. All rights reserved\./i)).toBeInTheDocument();
  });

  test('renders with correct container styles', () => {
    render(<Footer />);
    const container = screen.getByText(/© 2024/).parentElement;
    expect(container).toHaveClass('container', 'mx-auto', 'text-center');
  });

  test('renders with correct padding', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('py-4');
  });

  test('applies correct margin to container', () => {
    render(<Footer />);
    const container = screen.getByText(/© 2024/).parentElement;
    expect(container).toHaveClass('mx-auto');
  });

  test('renders current year in copyright text', () => {
    const currentYear = new Date().getFullYear().toString();
    render(<Footer />);
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  test('maintains fixed structure and styling', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});