import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      // You can add validation for email format here if needed
    },
    ratings: {
      type: Number,
      min: 1,
      max: 5,
      default: 5, // You can set a default rating if needed
    },
    testimonial: {
      type: String,
    },
    designation: {
      type: String,
      required: false,
      default: "Unknown Customer",
    },
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
