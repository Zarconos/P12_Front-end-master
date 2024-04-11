import React, { useState } from 'react';

function Table({ data }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const displayData = () => {
        let filteredData = data.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        if (sortColumn) {
            filteredData.sort((a, b) => {
                const valA = a[sortColumn].toString().toLowerCase();
                const valB = b[sortColumn].toString().toLowerCase();
                if (sortOrder === 'asc') {
                    return valA.localeCompare(valB);
                } else {
                    return valB.localeCompare(valA);
                }
            });
        }

        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = startIndex + entriesPerPage;

        return filteredData.slice(startIndex, endIndex).map((row, index) => (
            <tr key={index}>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.startDate}</td>
                <td>{row.department}</td>
                <td>{row.dateOfBirth}</td>
                <td>{row.street}</td>
                <td>{row.city}</td>
                <td>{row.state}</td>
                <td>{row.zipCode}</td>
            </tr>
        ));
    };

    return (
        <div className="table-container">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={entriesPerPage} onChange={handleEntriesPerPageChange}>
                <option value="5">5 entries</option>
                <option value="10">10 entries</option>
                <option value="20">20 entries</option>
                <option value="30">30 entries</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('firstName')}>First Name</th>
                        <th onClick={() => handleSort('lastName')}>Last Name</th>
                        <th onClick={() => handleSort('startDate')}>Start Date</th>
                        <th onClick={() => handleSort('department')}>Department</th>
                        <th onClick={() => handleSort('dateOfBirth')}>Date of Birth</th>
                        <th onClick={() => handleSort('street')}>Street</th>
                        <th onClick={() => handleSort('city')}>City</th>
                        <th onClick={() => handleSort('state')}>State</th>
                        <th onClick={() => handleSort('zipCode')}>Zip Code</th>
                    </tr>
                </thead>
                <tbody>{displayData()}</tbody>
            </table>
            <div>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} </span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={data.length <= currentPage * entriesPerPage}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Table;
