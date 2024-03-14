//home.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/reducers'; // Importez l'action addEmployee depuis votre slice de réduction
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import states from '../data/data';
import Modal from '../components/modal';
import '../style/style.css';
import logo from "../assets/Logo.png";

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

    return (
        <div className="container">
            <img src={logo} alt="sportSee" className="logo" aria-label="logo sportSee" />
            <h1>HRnet</h1>
            <a href="/employee-list">Voir les employés actuels</a>
            <h2>Créer un employé</h2>
            <form onSubmit={saveEmployee} id="create-employee">
                <label htmlFor="first-name">Prénom</label>
                <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor="last-name">Nom</label>
                <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label htmlFor="date-of-birth">Date de naissance</label>
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
            {/* Utilisez le composant Modal et le state pour contrôler son ouverture */}
            {isModalOpen && <Modal onClose={closeModal} options={{ closeText: 'Close' }} />}
            {/* Affichez le message de confirmation dans le modal */}
           
        </div>
    );
}

export default EmployeeFormPage;
