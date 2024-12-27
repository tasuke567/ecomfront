// src/components/common/__tests__/Table.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../Table';

describe('Table Component', () => {
  const mockHeaders = {
    id: 'ID',
    name: 'Name',
    email: 'Email',
    status: 'Status'
  };

  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
  ];

  beforeEach(() => {
    // Mock window.innerWidth
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  test('renders desktop table view when screen width >= 768px', () => {
    render(<Table headers={mockHeaders} data={mockData} />);
    
    // Check headers
    Object.values(mockHeaders).forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    // Check data cells
    mockData.forEach(row => {
      Object.values(row).forEach(cell => {
        expect(screen.getByText(cell.toString())).toBeInTheDocument();
      });
    });

    // Verify table structure
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('rowgroup')).toBeInTheDocument(); // thead
    expect(screen.getAllByRole('row')).toHaveLength(3); // header + 2 data rows
  });

  test('renders mobile card view when screen width < 768px', () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));

    render(<Table headers={mockHeaders} data={mockData} />);
    
    // Check headers and data in mobile view
    mockData.forEach(row => {
      Object.entries(row).forEach(([key, value]) => {
        expect(screen.getByText(mockHeaders[key])).toBeInTheDocument();
        expect(screen.getByText(value.toString())).toBeInTheDocument();
      });
    });

    // Verify mobile card structure
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    const mobileCards = document.querySelectorAll('.bg-white.shadow.rounded-lg');
    expect(mobileCards).toHaveLength(mockData.length);
  });

  test('applies correct header styles', () => {
    render(<Table headers={mockHeaders} data={mockData} />);
    
    const headerCells = screen.getAllByRole('columnheader');
    headerCells.forEach(cell => {
      expect(cell).toHaveClass(
        'px-6',
        'py-3',
        'text-left',
        'text-xs',
        'font-medium',
        'text-gray-500',
        'uppercase',
        'tracking-wider'
      );
    });
  });

  test('applies correct data cell styles', () => {
    render(<Table headers={mockHeaders} data={mockData} />);
    
    const dataCells = screen.getAllByRole('cell');
    dataCells.forEach(cell => {
      expect(cell).toHaveClass('px-6', 'py-4', 'whitespace-nowrap');
    });
  });

  test('handles empty data array', () => {
    render(<Table headers={mockHeaders} data={[]} />);
    
    // Should still render table structure
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('rowgroup')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(1); // just header row
  });

  test('handles data with missing fields', () => {
    const incompleteData = [
      { id: 1, name: 'John Doe' }, // missing email and status
    ];

    render(<Table headers={mockHeaders} data={incompleteData} />);
    
    // Should render empty cells for missing data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    const row = screen.getAllByRole('row')[1];
    expect(row.children).toHaveLength(4); // should still have all columns
  });

  test('mobile view renders correctly with responsive classes', () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));

    render(<Table headers={mockHeaders} data={mockData} />);
    
    const mobileView = screen.getByRole('region');
    expect(mobileView).toHaveClass('block', 'md:hidden');

    const desktopView = screen.getByRole('complementary');
    expect(desktopView).toHaveClass('hidden', 'md:table');
  });

  test('handles row click events', () => {
    const onRowClick = jest.fn();
    render(<Table headers={mockHeaders} data={mockData} onRowClick={onRowClick} />);
    
    const rows = screen.getAllByRole('row').slice(1); // exclude header row
    rows.forEach((row, index) => {
      row.click();
      expect(onRowClick).toHaveBeenCalledWith(mockData[index]);
    });
  });

  test('mobile view preserves data order', () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));

    render(<Table headers={mockHeaders} data={mockData} />);
    
    const mobileCards = document.querySelectorAll('.bg-white.shadow.rounded-lg');
    mobileCards.forEach((card, index) => {
      Object.entries(mockData[index]).forEach(([key, value]) => {
        expect(card).toHaveTextContent(value.toString());
      });
    });
  });
});