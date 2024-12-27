// src/components/common/__tests__/Card.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  const defaultProps = {
    children: <div>Test content</div>
  };

  test('renders without title', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('renders with title', () => {
    render(<Card {...defaultProps} title="Test Title" />);
    
    expect(screen.getByRole('heading')).toHaveTextContent('Test Title');
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders title section with correct styles', () => {
    render(<Card {...defaultProps} title="Test Title" />);
    
    const titleSection = screen.getByText('Test Title').closest('div');
    expect(titleSection).toHaveClass('px-6', 'py-4', 'border-b');
  });

  test('renders content section with correct styles', () => {
    render(<Card {...defaultProps} />);
    
    const contentSection = screen.getByText('Test content').closest('div');
    expect(contentSection).toHaveClass('p-6');
  });

  test('renders title with correct text style', () => {
    render(<Card {...defaultProps} title="Test Title" />);
    
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toHaveClass('text-lg', 'font-semibold');
  });

  test('renders nested components correctly', () => {
    const complexContent = (
      <div>
        <h2>Section Title</h2>
        <p>Paragraph content</p>
        <button>Click me</button>
      </div>
    );
    
    render(<Card>{complexContent}</Card>);
    
    expect(screen.getByRole('heading', { name: 'Section Title' })).toBeInTheDocument();
    expect(screen.getByText('Paragraph content')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders with custom class names', () => {
    render(
      <Card className="custom-class" title="Test Title">
        {defaultProps.children}
      </Card>
    );
    
    const cardElement = screen.getByText('Test content').closest('.card');
    expect(cardElement).toHaveClass('custom-class');
  });
});