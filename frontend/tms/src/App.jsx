import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationForm';
import LoginForm from './components/Login/LoginForm'
import Home from './components/Home';  

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default App;