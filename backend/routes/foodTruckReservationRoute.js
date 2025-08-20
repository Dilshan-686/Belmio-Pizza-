import express from "express";
import { createFoodTruckReservation, getFoodTruckReservations } from "../controllers/foodTruckReservationController.js";

const router = express.Router();

// POST /api/foodtruck-reservations/  => create new reservation
router.post("/", createFoodTruckReservation);

// GET /api/foodtruck-reservations/   => fetch all reservations
router.get("/", getFoodTruckReservations);

export default router;
