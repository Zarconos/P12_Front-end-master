import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

describe('Table', () => {
  it('renders table headers correctly', () => {
    const columns = [
      { Header: 'First Name' },
      { Header: 'Last Name' },
      { Header: 'Start Date' },
      { Header: 'Department' },
      { Header: 'Date of Birth' },
      { Header: 'Street' },
      { Header: 'City' },
      { Header: 'State' },
      { Header: 'Zip Code' }
    ];
    const data = []; // Utilisez des données vides car nous ne testons que l'en-tête ici

    render(<Table data={data} columns={columns} />);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    // Ajoutez des assertions pour les autres en-têtes de colonne
  });

  it('renders employee data correctly', () => {
    const columns = [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' }
    ];
    const data = [
      { firstName: 'John', lastName: 'Doe', startDate: '2020-01-01', department: 'HR', dateOfBirth: '1990-01-01', street: '123 Street', city: 'City', state: 'State', zipCode: '12345' }
    ];

    render(<Table data={data} columns={columns} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
  });
});
