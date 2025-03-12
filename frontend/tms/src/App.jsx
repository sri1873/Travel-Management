import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration/RegistrationForm';
import Home from './components/Home'; 
import Itinerary from './components/itinerary/trip_packages';
import BookingHistory from './components/itinerary/booking_history';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Add this route */}
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/itinerary" element={<Itinerary/>}/>
                {/* <Route path="/activities" element={<BookingHistory/>}/> */}
                <Route path="/bookinghistory" element={<BookingHistory/>}/>

            </Routes>
        </Router>
    );
};

export default App;
