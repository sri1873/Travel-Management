import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import flightReducer from "./flightSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    flight: flightReducer,
  },
});
