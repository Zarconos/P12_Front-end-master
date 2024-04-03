//home.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/reducers'; // Importez l'action addEmployee depuis votre slice de réduction
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import states from '../data/data';
import Modal from 'react-modal-zarconoshrnet';
import '../style/style.css';
import '../style/modal.css';
import logo from "../assets/Logo.webp";


function EmployeeFormPage() {
    const dispatch = useDispatch(); // Obtenez la fonction dispatch pour pouvoir envoyer des actions Redux

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [startDate, setStartDate] = useState('');
    const [department, setDepartment] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    function saveEmployee(event) {
        event.preventDefault();

        if (!firstName || !lastName || !dateOfBirth || !startDate || !department || !street || !city || !state || !zipCode) {
            alert("Please fill in all fields");
            return; // Arrêtez l'exécution de la fonction si un champ est vide
        }

        const formattedDateOfBirth = moment(dateOfBirth).format("YYYY-MM-DD");

        const employee = {
            firstName,
            lastName,
            dateOfBirth: formattedDateOfBirth,
            startDate,
            department,
            street,
            city,
            state,
            zipCode
        };

        dispatch(addEmployee(employee)); // Envoyez l'action d'ajout d'employé au store Redux
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }
    const modalContent = <div id="confirmation" className="modal-text">Employee Created!</div>;

    return (
        <div className="container">
            <img src={logo} alt="hrnet" className="logo" aria-label="logo hrnet" />
            <h1>HRnet</h1>
            <a href="/employee-list">View Current Employees</a>
            <h2>Create Employee</h2>
            <form onSubmit={saveEmployee} id="create-employee" data-testid="create-employee">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label htmlFor="date-of-birth">Date of Birth</label>
                <div data-testid="date-of-birth">
                <Datetime
                    id="date-of-birth"
                    value={dateOfBirth}
                    onChange={value => setDateOfBirth(value)}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                />
                </div>
                <label htmlFor="start-date">Start Date</label>
                <Datetime
                    id="start-date"
                    value={startDate}
                    onChange={value => setStartDate(value)}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                />

                <fieldset className="address">
                    <legend>Address</legend>

                    <div className="address-fields">
                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>

                    <div className="address-fields">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="address-fields">
                        <label htmlFor="state">State</label>
                        <select name="state" id="state" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">Select State</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.abbreviation}>{state.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="address-fields">
                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </div>

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
            <div data-testid="modal">
            {isModalOpen && <Modal onClose={closeModal} content={modalContent} options={{ closeText: 'x', modalText: 'Custom Text Here' }} />}
            </div>
           
        </div>
    );
}

export default EmployeeFormPage;
