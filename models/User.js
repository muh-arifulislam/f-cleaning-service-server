import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  role: {
    type: String,
    enum: ["moderate", "admin"],
    default: "moderate",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
