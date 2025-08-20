import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview); // Handles POST /api/reviews
router.get("/", getReviews);    // Handles GET /api/reviews

export default router;