import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: false,
      required: false,
      default: "",
    },
    address: { type: String, required: true },
    status: { type: Boolean },
  },
  {
    timestamps: {
      createdAt: "createdAt", // Change the field name if needed
      updatedAt: "updatedAt", // Change the field name if needed
      timeZone: "Asia/Dhaka", // Set the timeZone option to 'Asia/Muscat' for Oman's time zone
    },
  }
);

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
