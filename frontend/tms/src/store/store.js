import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import flightReducer from "./flightSlice";
import selectedFlightReducer from "./selectedFlightSlice";
import bookingReducer from "./itineraryBookingSlice";
import hotelReducer from "./hotelSlice";
import hotelDetailsReducer from "./hotelDetailsSlice";
import hotelBookingReducer from "./hotelBookingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    flight: flightReducer,
    selectedFlight: selectedFlightReducer,
    bookings: bookingReducer
    hotels: hotelReducer,
    hotelDetails: hotelDetailsReducer,
    hotelBooking: hotelBookingReducer,
  },
});
