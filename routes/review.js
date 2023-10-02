import express from "express";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/review.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();

route.get("/reviews", getReviews);
route.post("/review", addReview);
route.delete("/review/:id", verifyJWT, deleteReview);
route.put("/review/:id", verifyJWT, updateReview);

export default route;
