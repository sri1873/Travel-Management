import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export const selectUserToken = (state) => state.user.token;
export const selectUserRole = (state) => state.user.role;

export default userSlice.reducer;
