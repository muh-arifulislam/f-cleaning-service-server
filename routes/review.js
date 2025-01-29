import express from "express";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/review.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();

route.get("/", getReviews);

route.post("/", addReview);

route.delete("/:id", verifyJWT, deleteReview);

route.put("/:id", verifyJWT, updateReview);

export default route;
