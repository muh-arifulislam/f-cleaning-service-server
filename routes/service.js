import express from "express";
import { getService, getServices } from "../controllers/service.js";

const router = express.Router();

router.get("/", getServices);

router.get("/:id", getService);

export default router;
