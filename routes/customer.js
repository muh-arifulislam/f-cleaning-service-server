import express from "express";
import { getCustomers } from "../controllers/customer.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();

route.get("/", verifyJWT, getCustomers);

export default route;
