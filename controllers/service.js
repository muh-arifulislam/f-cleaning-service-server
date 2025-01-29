import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err?.message });
  }
};

export const getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    return res.status(200).json({
      success: true,
      data: service,
    });
  } catch (err) {
    return res.status(404).json({ success: false, message: err?.message });
  }
};
