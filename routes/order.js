import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import { addOrder, getOrders, updateOrder } from "../controllers/order.js";

const route = express.Router();

route.post("/", addOrder);

route.get("/", verifyJWT, getOrders);

route.put("/:id", verifyJWT, updateOrder);

export default route;
