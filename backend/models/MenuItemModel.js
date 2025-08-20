import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  medium: {
    type: Number,
    required: true
  },
  large: {
    type: Number,
    required: true
  },
});

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true

    },
    prices: priceSchema,
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
