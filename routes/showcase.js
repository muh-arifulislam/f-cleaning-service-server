import express from "express";
import {
  addShowcase,
  getShowcases,
  removeShowcase,
} from "../controllers/showcase.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();

route.get("/", getShowcases);

route.post("/", verifyJWT, addShowcase);

route.delete("/:id", verifyJWT, removeShowcase);

export default route;
