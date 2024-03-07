import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeListPage from './pages/employee-list';
import EmployeeFormPage from './pages/home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeFormPage />} />
                <Route path="/employee-list" element={<EmployeeListPage />} />
            </Routes>
        </Router>
    );
}

export default App;

