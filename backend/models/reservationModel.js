// models/Reservation.js
import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  headCount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  inTime: {
    type: String,
    required: true,
  },
  outTime: {
    type: String,
    required: true,
  },
  tables: {
    type: [Number],
    required: true,
  },
});

export default mongoose.model("Reservation", ReservationSchema);