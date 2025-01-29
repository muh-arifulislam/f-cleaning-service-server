import express from "express";
import {
  addShowcase,
  getShowcases,
  removeShowcase,
} from "../controllers/showcase.js";
import verifyJWT from "../middleware/verifyJWT.js";
import { upload } from "../utils/sentImageToCloudinary.js";

const route = express.Router();

route.get("/", getShowcases);

route.post(
  "/",
  verifyJWT,
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  addShowcase
);

route.delete("/:id", verifyJWT, removeShowcase);

export default route;
