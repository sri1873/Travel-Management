import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotel: null,
  reviews: [],
  loading: false,
  error: null,
  reviewText: '',
  rating: 1,
};

const hotelDetailsSlice = createSlice({
  name: 'hotelDetails',
  initialState,
  reducers: {
    setHotel(state, action) {
      state.hotel = action.payload;
    },
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setReviewText(state, action) {
      state.reviewText = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
    addReview(state, action) {
      state.reviews.push(action.payload);
    },
    clearReviewForm(state) {
      state.reviewText = '';
      state.rating = 1;
    },
  },
});

export const {
  setHotel,
  setReviews,
  setLoading,
  setError,
  setReviewText,
  setRating,
  addReview,
  clearReviewForm,
} = hotelDetailsSlice.actions;

export default hotelDetailsSlice.reducer;
