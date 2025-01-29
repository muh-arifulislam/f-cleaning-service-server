import User from "../models/User.js";

// get users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error?.message,
    });
  }
};

// add customer
export const addUser = async (req, res) => {
  try {
    const doc = req.body;
    const newUser = new User(doc);
    const result = await newUser.save();

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);

    return res.status(200).json({ success: true, data: null });
  } catch (err) {
    return res.status(404).json({ success: false, message: err?.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { email } = req.decoded;

    if (email) {
      const result = await User.findOne({
        email,
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    }

    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "something went wrong" });
  }
};
