import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import states from '../data/data';

function EmployeeFormPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [startDate, setStartDate] = useState('');
    const [department, setDepartment] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    function saveEmployee(event) {
        event.preventDefault(); // Pour éviter le rechargement de la page par défaut

        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employee = {
            firstName,
            lastName,
            dateOfBirth,
            startDate,
            department,
            street,
            city,
            state,
            zipCode
        };
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
        document.getElementById('confirmation').classList.add('active');
    }

    return (
        <div className="container">
            <h1>HRnet</h1>
            <a href="/employee-list">View Current Employees</a>
            <h2>Create Employee</h2>
            <form onSubmit={saveEmployee} id="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label htmlFor="date-of-birth">Date of Birth</label>
                
                <Datetime
                    id="date-of-birth"
                    value={dateOfBirth}
                    onChange={value => setDateOfBirth(value)}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                />

                <label htmlFor="start-date">Start Date</label>
                <input id="start-date" type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                <fieldset className="address">
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} />

                    <label htmlFor="city">City</label>
                    <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />

                    <label htmlFor="state">State</label>
                    <select name="state" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state.abbreviation}>{state.name}</option>
                        ))}
                    </select>

                    <label htmlFor="zip-code">Zip Code</label>
                    <input id="zip-code" type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </fieldset>

                <label htmlFor="department">Department</label>
                <select name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                </select>

                <button type="submit">Save</button>
            </form>
            <div id="confirmation" className="modal">Employee Created!</div>
        </div>
    );
}

export default EmployeeFormPage;