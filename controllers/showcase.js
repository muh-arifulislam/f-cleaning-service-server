import { startSession } from "mongoose";
import Showcase from "../models/Showcase.js";
import { deleteFromCloudinary } from "../utils/sentImageToCloudinary.js";

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
  const payload = req.body;

  try {
    const newShowcase = new Showcase(payload);
    const result = await newShowcase.save();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
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

    const publicId = response.imagePublicId;
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
