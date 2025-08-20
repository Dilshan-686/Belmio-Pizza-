import axios from 'axios';

const apiUrl = "http://localhost:4000/api/reservations"; // Base URL for the API

// Get reserved tables for a given date and time slot range
const getReservedTables = async (date, inSlot, outSlot) => {
  try {
    const response = await axios.get(`${apiUrl}/getTable`, {
      params: { date, inSlot, outSlot },
    });
    return response.data.reservedTables || [];
  } catch (error) {
    console.error('Error fetching reserved tables:', error);
    throw new Error('Unable to fetch reserved tables');
  }
};

// Create a new reservation
const createReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${apiUrl}/addRes`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Unable to create reservation');
  }
};

export default {
  getReservedTables,
  createReservation,
};
