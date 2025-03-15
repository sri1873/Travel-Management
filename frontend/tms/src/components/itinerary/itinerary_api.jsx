import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const fetchTripPackages = () => axios.get(`${API_URL}/trip-packages`);
export const fetchBookings = () => axios.get(`${API_URL}/bookings`);
export const addBooking = (booking) => axios.post(`${API_URL}/bookings`, booking);
