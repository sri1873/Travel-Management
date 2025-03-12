import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id:"",
    airline:"",
    from: "",
    to: "",
    departure: "",
    arrival: "",
    layover: 0,
    layoverDuration:"",
    duration:"",
    passengers: 1,
};

const selectedFlightSlice = createSlice({
    name: "selectedFlight",
    initialState,
    reducers: {
        setSelectedFlightDetails: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetSelectedFlightDetails: () => initialState,
    },
});

export const { setSelectedFlightDetails, resetSelectedFlightDetails } = selectedFlightSlice.actions;
export default selectedFlightSlice.reducer;
