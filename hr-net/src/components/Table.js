import React, { useState } from 'react';

function Table({ data }) {
    // État pour gérer la recherche
    const [searchTerm, setSearchTerm] = useState('');
    // État pour gérer le nombre d'entrées à afficher par page
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    // État pour gérer la page actuelle
    const [currentPage, setCurrentPage] = useState(1);

    // Fonction pour gérer le changement de recherche
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Fonction pour gérer le changement du nombre d'entrées par page
    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Réinitialise la page actuelle lors du changement du nombre d'entrées par page
    };

    // Fonction pour afficher les entrées correspondant à la page actuelle
    const displayData = () => {
        const filteredData = data.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

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
            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {/* Sélecteur pour afficher le nombre d'entrées par page */}
            <select value={entriesPerPage} onChange={handleEntriesPerPageChange}>
                <option value="5">5 entries</option>
                <option value="10">10 entries</option>
                <option value="20">20 entries</option>
                <option value="30">30 entries</option>
            </select>
            {/* Tableau */}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Start Date</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr>
                </thead>
                <tbody>{displayData()}</tbody>
            </table>
            {/* Pagination */}
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
