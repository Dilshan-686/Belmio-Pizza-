import express from "express";
import cors from "cors";
dotenv.config();
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import menuRoutes from "./routes/menuRoutes.js"; // Correctly included menuRoutes import
import reviewRouter from "./routes/reviewRouter.js";
import reservationRouter from "./routes/reservationRoute.js";
import foodTruckRouter from "./routes/foodTruckReservationRoute.js";
import paymentRouter from "./routes/paymentRoute.js"; 
import { handleStripeWebhook } from "./controllers/webhookController.js";

import dotenv from "dotenv";
import passport from "./config/passport.js";
import session from "express-session";


// App config
const app = express();
const port = process.env.PORT || 4000;
app.post("/webhooks/stripe", express.raw({ type: "application/json" }), handleStripeWebhook);


app.use(express.json());
app.use(cors());

connectDB();
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Routes
app.use("/api/user", userRouter);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/menu", menuRoutes); // Correctly set up menu routes
app.use("/api/reviews", reviewRouter); // Correct path for reviews
//app.use("/api/reservations", reservationRouter); // Add the new reservation route
app.use("/api/reservations", reservationRouter);
app.use("/api/foodtruck-reservations", foodTruckRouter);
 // Food truck reservation route
 app.use("/api/payments", paymentRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
