import express from "express";
import {
  addShowcase,
  getShowcases,
  removeShowcase,
} from "../controllers/showcase.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();
route.get("/showcases", getShowcases);
route.post("/showcase", verifyJWT, addShowcase);
route.delete("/showcase/:id", verifyJWT, removeShowcase);

export default route;
