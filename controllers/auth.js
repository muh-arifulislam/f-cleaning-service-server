import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found...!" });
    }

    if (password !== user.password) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid credential" });
    }

    const token = generateToken({
      email: user.email,
      role: user.role,
    });

    return res
      .status(200)
      .json({ success: true, data: { accessToken: token } });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong" });
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = generateToken({
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      data: { accessToken: token },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "something went wrong" });
  }
};
