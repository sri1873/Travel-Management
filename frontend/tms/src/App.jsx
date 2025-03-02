import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationForm';
import Home from './components/Home'; // Your existing home component
import RestaurantList from './components/Restaurant/RestaurantList';
import RestaurantDetail from './components/Restaurant/RestaurantDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegistrationForm />} />
                {/* New routes for restaurant discovery */}
                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
