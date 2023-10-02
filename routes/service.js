import express from "express";
import { getService, getServices } from "../controllers/service.js";

const router = express.Router();

router.get("/services", getServices);
router.get("/service/:id", getService);

export default router;
