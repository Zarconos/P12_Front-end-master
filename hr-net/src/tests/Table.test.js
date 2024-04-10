
// All necessary imports here
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/Table'; // Assuming the Table component is in a file named Table.js in the same directory

// Example data to be used for tests
const data = [
    { firstName: 'John', lastName: 'Doe', startDate: '01/01/2020', department: 'HR', dateOfBirth: '1990-01-01', street: '123 Elm St', city: 'Anytown', state: 'CA', zipCode: '12345' },
    { firstName: 'Jane', lastName: 'Doe', startDate: '02/01/2020', department: 'IT', dateOfBirth: '1991-02-01', street: '456 Oak St', city: 'Anycity', state: 'TX', zipCode: '67890' },
    { firstName: 'Jim', lastName: 'Beam', startDate: '03/01/2020', department: 'Finance', dateOfBirth: '1992-03-01', street: '789 Pine St', city: 'Thiscity', state: 'FL', zipCode: '10112' }
];

describe('Table component', () => {
    test('renders without crashing', () => {
        render(<Table data={data} />);
        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

  test('renders the correct initial number of entries', () => {
    render(<Table data={data} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4); // as data length is 3 and one for header
  });

  test('changes entries per page', () => {
    render(<Table data={data} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 10 } });
    const options = screen.getAllByRole('option');
    expect(options[1].selected).toBeTruthy();
  });

  test('filters data based on search term', () => {
    render(<Table data={data} />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Jane' } });
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

  test('navigates to the next page', () => {
    render(<Table data={Array(10).fill(data[0])} />); // Render component with 10 identical entries to test pagination
    fireEvent.click(screen.getByText(/next/i));
    expect(screen.getByText(/page 2/i)).toBeInTheDocument();
  });

  test('navigates to the previous page after navigating to next page', () => {
    render(<Table data={Array(10).fill(data[0])} />);
    fireEvent.click(screen.getByText(/next/i));
    fireEvent.click(screen.getByText(/previous/i));
    expect(screen.getByText(/page 1/i)).toBeInTheDocument();
  });

  test('disables the Previous button on the first page', () => {
    render(<Table data={data} />);
    expect(screen.getByText(/previous/i)).toBeDisabled();
  });

  test('disables the Next button on the last page', () => {
    render(<Table data={Array(5).fill(data[0])} />);
    expect(screen.getByText(/next/i)).toBeDisabled();
  });

  test('ensures search resets current page to 1', () => {
    render(<Table data={Array(10).fill(data[0])} />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'John' } });
    expect(screen.getByText(/page 1/i)).toBeInTheDocument();
  });

  // Additional tests can be designed for edge cases, such as invalid data handling, extreme cases for search and pagination, etc.

})