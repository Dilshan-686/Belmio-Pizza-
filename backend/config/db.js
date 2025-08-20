import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://kavindusarathchandraaa:EG20214790@cluster0.531tr.mongodb.net/belmio-pizza').then(() => console.log("DB Connected"));

}

