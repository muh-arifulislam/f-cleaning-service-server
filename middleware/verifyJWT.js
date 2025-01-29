import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!authHeader) {
      return res.status(401).send({ message: "access token not found" });
    }

    // checking if the given token is valid
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const { email } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("This user is not found !");
    }

    req.decoded = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .send({ message: "forbidden access from middleware" });
  }
}

export default verifyJWT;
