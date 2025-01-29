import Customer from "../models/Customer.js";

// get all customer
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error?.message,
    });
  }
};
