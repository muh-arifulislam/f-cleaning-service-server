import mongoose from "mongoose";
import Customer from "../models/Customer.js";

// get all customer
export const getCustomers = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;

    if (decoded.email === email) {
      const customers = await Customer.find();
      return res.status(200).json(customers);
    }
    res.status(401).json({ message: "unauthorized access" });
  } catch (error) {
    res.status(404).json(error);
  }
};

// add customer
export const addCustomer = async (req, res) => {
  try {
    const doc = req.body;
    const newCustomer = new Customer({ ...doc, status: false });
    const result = await newCustomer.save();
    res.status(200).json({ acknowledgement: true, customer: result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;
    if (decoded.email === email) {
      const id = req.params.id;
      const result = await Customer.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      return res.status(200).json(result);
    }
    res.status(401).json({ message: "unauthorized access" });
  } catch (err) {
    res.status(404).json({ messgae: err.message });
  }
};

// update customer
export const updateCustomer = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;

    const id = req.params.id;
    const updates = req.body;
    if (decoded.email === email) {
      const updatedDocument = await Customer.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      return res
        .status(200)
        .json({ acknowledgement: true, data: updatedDocument });
    }
    return res.status(401).json({ message: "unauthorized access" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
