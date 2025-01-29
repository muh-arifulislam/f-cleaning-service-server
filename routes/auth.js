import express from "express";
import { loginWithEmail, loginWithGoogle } from "../controllers/auth.js";

const route = express.Router();

route.post("/login", loginWithEmail);

route.post("/google", loginWithGoogle);

export default route;
