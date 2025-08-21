import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    cartData: {
      type: Object,
      default: {},
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
      profileImage: { type: String }
  },
  { minimize: false } // Keep empty objects
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
/* 
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    */
   