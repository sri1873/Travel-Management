import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTripPackages, fetchBookings, addBooking as apiAddBooking } from "../components/itinerary/itinerary_api";

// Async Thunks
export const loadTripPackages = createAsyncThunk("booking/loadTripPackages", async () => {
    const response = await fetchTripPackages();
    return response.data;
});

export const loadBookings = createAsyncThunk("booking/loadBookings", async () => {
    const response = await fetchBookings();
    return response.data;
});

export const addBooking = createAsyncThunk("booking/addBooking", async (booking) => {
    const response = await apiAddBooking(booking);
    return response.data;
});

// Slice
const bookingSlice = createSlice({
    name: "bookingHistory",
    initialState: {
        tripPackages: [],
        bookings: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTripPackages.fulfilled, (state, action) => {
                state.tripPackages = action.payload;
            })
            .addCase(loadBookings.fulfilled, (state, action) => {
                state.bookings = action.payload;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.bookings.push(action.payload);
            });
    },
});

export default bookingSlice.reducer;
