import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
