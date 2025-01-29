import { startSession } from "mongoose";
import Showcase from "../models/Showcase.js";
import {
  deleteFile,
  deleteFromCloudinary,
  sendImageToCloudinary,
} from "../utils/sentImageToCloudinary.js";

export const getShowcases = async (req, res) => {
  try {
    const showcases = await Showcase.find();

    return res.status(200).json({
      success: true,
      data: showcases,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error?.message });
  }
};

export const addShowcase = async (req, res) => {
  const file = req.file;
  const payload = req.body;
  const path = file?.path;

  try {
    const imageName = `showcase${
      Date.now() + "-" + Math.round(Math.random() * 1e9)
    }`;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.img = secure_url;

    const newShowcase = new Showcase(payload);
    const result = await newShowcase.save();

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    deleteFile(path);
    res.status(404).json({
      success: false,
      message: error?.message,
    });
  }
};

export const removeShowcase = async (req, res) => {
  const session = await startSession();
  try {
    session.startTransaction();

    const id = req.params.id;
    const response = await Showcase.findByIdAndDelete([id], { session });
    if (!response) {
      throw new Error("Showcase not found");
    }

    const filename = response?.img?.split("/").pop();
    const publicId = filename.replace(/\.[^/.]+$/, "");
    await deleteFromCloudinary(publicId);

    await session.commitTransaction();
    await session.endSession();
    return res.status(200).json({ success: true, data: null });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    res.status(404).json({
      success: false,
      message: error?.message,
    });
  }
};
