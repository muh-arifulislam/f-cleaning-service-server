import Service from "../models/Service.js";
import mongoose from "mongoose";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json(services);
  } catch (err) {
    res.status(404).json({ messgae: err.message });
  }
};
export const getService = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findOne({ _id: new mongoose.Types.ObjectId(id) });

    res.status(200).json(service);
  } catch (err) {
    res.status(404).json({ messgae: err.message });
  }
};
