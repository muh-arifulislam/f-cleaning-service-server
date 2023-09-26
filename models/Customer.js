import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
