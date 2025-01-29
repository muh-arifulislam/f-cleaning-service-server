import { startSession } from "mongoose";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";

export const addOrder = async (req, res) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const doc = req.body;

    const orderRes = await Order.create([doc], { session });

    const customer = await Customer.findOne({
      phone: doc?.phone,
    });

    if (!customer) {
      await Customer.create(
        [
          {
            ...doc,
            orders: orderRes[0]._id,
          },
        ],
        { session }
      );
    } else {
      await Customer.findOneAndUpdate(
        {
          phone: doc?.phone,
        },
        {
          $addToSet: {
            orders: orderRes[0]._id,
          },
        }
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return res.status(200).json({ acknowledgement: true });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    res.status(404).json({ error });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }

    const result = await Order.findByIdAndUpdate(id, payload);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err?.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    return res.status(400).json({
      success: err?.message,
    });
  }
};
