import User from "../models/User.js";

// get users
export const getUsers = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;
    if (decoded.email === email) {
      const users = await User.find();
      return res.status(200).json(users);
    }
    return res.status(401).json({ message: "unauthorized access" });
  } catch (error) {
    res.status(404).json(error);
  }
};

// add customer
export const addUser = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;
    const doc = req.body;
    if (decoded.email === email) {
      const newUser = new User(doc);
      const result = await newUser.save();
      return res.status(200).json({ acknowledgement: true, user: result });
    }
    res.status(401).json({ message: "unauthorized access" });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    res.status(200).json({ deletedCount: 1 });
  } catch (err) {
    res.status(404).json({ messgae: err.message });
  }
};
