import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationForm';
import Home from './components/Home';  // Your home component or just a placeholder

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Add this route */}
                <Route path="/register" element={<RegistrationForm />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
