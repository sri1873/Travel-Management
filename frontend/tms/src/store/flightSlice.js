import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    from: "",
    to: "",
    depart: "",
    return:"",
    passengers: 1,
};

const flightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {
        setFlightDetails: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetFlightDetails: () => initialState,
    },
});

export const { setFlightDetails, resetFlightDetails } = flightSlice.actions;
export default flightSlice.reducer;
