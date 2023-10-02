import jwt from "jsonwebtoken";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import User from "../models/User.js";

const UPLOADS_FOLDER = "./../public/uploads/images";

// Multer setup
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // You can access the uploaded file information through req.file
  const fileName = req.file.filename;

  // Perform any additional processing or database operations here

  res.status(200).json({ acknowledgement: true, img: fileName });
};

export const deleteImage = (fileName) => {
  fs.unlinkSync(`./public/uploads/images/${fileName}`);
};

export const provideJWTToken = async (req, res) => {
  const email = req.params.email;
  const query = { email };
  const result = await User.findOne(query);

  if (!result) {
    return res.status(403).json({ message: "unauthorized login" });
  }
  const token = jwt.sign({ email: email }, process.env.ACCESS_SECRET, {
    expiresIn: "2d",
  });
  return res.status(200).json({ accessToken: token });
};
