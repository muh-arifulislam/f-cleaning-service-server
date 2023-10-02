import express from "express";
import {
  provideJWTToken,
  upload,
  uploadImage,
} from "../controllers/general.js";

const route = express.Router();

route.get("/login/:email", provideJWTToken);
route.post("/upload/image", upload.single("image"), uploadImage);

export default route;
