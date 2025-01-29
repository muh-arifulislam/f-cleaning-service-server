import express from "express";
import { addUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import verifyJWT from "../middleware/verifyJWT.js";

const route = express.Router();

route.get("/", verifyJWT, getUsers);

route.post("/", verifyJWT, addUser);

route.delete("/:id", verifyJWT, deleteUser);

route.get("/me", verifyJWT, getUser);

export default route;
