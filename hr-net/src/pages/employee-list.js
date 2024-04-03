// EmployeeListPage.js

import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../components/Table';
import '../style/Table.css';

function EmployeeListPage() {
    const employees = useSelector(state => state.storeData && state.storeData.employees);

    const columns = [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Start Date', accessor: 'startDate' },
        { Header: 'Department', accessor: 'department' },
        { Header: 'Date of Birth', accessor: 'dateOfBirth' },
        { Header: 'Street', accessor: 'street' },
        { Header: 'City', accessor: 'city' },
        { Header: 'State', accessor: 'state' },
        { Header: 'Zip Code', accessor: 'zipCode' },
    ];

    return (
        <div className="container">
            <h1>Current Employees</h1>
            <Table
                columns={columns}
                data={employees}
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <a href="/">Home</a>
        </div>
    );
}

export default EmployeeListPage;
