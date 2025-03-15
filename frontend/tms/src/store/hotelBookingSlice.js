import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  room: null,
  bookingDetails: {
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  },
  loading: false,
  error: null,
  bookingStatus: null,
};

const hotelBookingSlice = createSlice({
  name: 'hotelBooking',
  initialState,
  reducers: {
    setRoom(state, action) {
      state.room = action.payload;
    },
    setBookingDetails(state, action) {
      state.bookingDetails = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setBookingStatus(state, action) {
      state.bookingStatus = action.payload;
    },
  },
});

export const {
  setRoom,
  setBookingDetails,
  setLoading,
  setError,
  setBookingStatus,
} = hotelBookingSlice.actions;

export default hotelBookingSlice.reducer;
