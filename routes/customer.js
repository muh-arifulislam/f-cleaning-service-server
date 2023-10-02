import express from "express";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();

route.get("/customers", verifyJWT, getCustomers);
route.post("/customer", addCustomer);
route.delete("/customer/:id", verifyJWT, deleteCustomer);
route.put("/customer/:id", verifyJWT, updateCustomer);
export default route;
