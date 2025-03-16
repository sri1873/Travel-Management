import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotels: [],        
  loading: false,    
  error: null,        
  location: '',      
};

const hotelSlice = createSlice({
  name: 'hotels',  
  initialState,
  reducers: {
    setHotels(state, action) {
      state.hotels = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const { setHotels, setLoading, setError, setLocation } = hotelSlice.actions;
export default hotelSlice.reducer;
