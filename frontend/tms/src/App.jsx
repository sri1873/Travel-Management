import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationForm';
import Home from './components/Home'; 
import Itinerary from './components/itinerary/trip_packages';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Add this route */}
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/itinerary" element={<Itinerary/>}/>
            </Routes>
        </Router>
    );
};

export default App;
