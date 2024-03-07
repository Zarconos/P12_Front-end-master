import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Charger les employés depuis localStorage ou votre API
        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(employeesData);
    }, []);

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
            <ReactTable
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
