import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings:[]
};

const itineraryBookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setBookingHistory: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetBookings: () => initialState,
    },
});

export const { setBookingHistory, resetBookings } = itineraryBookingSlice.actions;
export default itineraryBookingSlice.reducer;
