import Showcase from "../models/Showcase.js";
import { deleteImage } from "./general.js";
import sharp from "sharp";

export const getShowcases = async (req, res) => {
  try {
    const showcases = await Showcase.find();
    res.status(200).json(showcases);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const addShowcase = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;
    const doc = req.body;
    const img = doc.img;
    const resizedImg = "res-" + img;
    if (decoded.email === email) {
      await sharp(`./public/uploads/images/${img}`)
        .resize({
          fit: "fill",
          width: 620,
          height: 672,
        })
        .toFile(`./public/uploads/images/${resizedImg}`);
      deleteImage(img);
      const newShowcase = new Showcase({ ...doc, img: resizedImg });
      const result = await newShowcase.save();
      return res.status(200).json({ acknowledgement: true, showcase: result });
    }
    return res.status(401).json({ message: "unauthorized access!!" });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const removeShowcase = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;
    const id = req.params.id;
    const img = req.body.img;
    if (decoded.email === email) {
      deleteImage(img);
      const result = await Showcase.findByIdAndDelete(id);
      return res.status(200).json({ deletedCount: 1 });
    }
    return res.status(401).json({ message: "unauthorized access!!" });
  } catch (error) {
    res.status(404).json(error);
  }
};
