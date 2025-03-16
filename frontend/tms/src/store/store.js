import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import flightReducer from "./flightSlice";
import selectedFlightReducer from "./selectedFlightSlice";
import bookingReducer from "./itineraryBookingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    flight: flightReducer,
    selectedFlight: selectedFlightReducer,
    bookings: bookingReducer
  },
});
