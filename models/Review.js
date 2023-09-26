import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
