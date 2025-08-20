// routes/reservationRoute.js
import express from "express";
import {
  createReservation,
  getReservedTables,
  getAllReservations
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/check", getReservedTables);
router.get("/", getAllReservations);

export default router;