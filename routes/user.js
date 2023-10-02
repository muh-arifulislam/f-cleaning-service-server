import express from "express";
import { addUser, deleteUser, getUsers } from "../controllers/user.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();

route.get("/users", verifyJWT, getUsers);
route.post("/user", verifyJWT, addUser);
route.delete("/user/:id", verifyJWT, deleteUser);

export default route;
