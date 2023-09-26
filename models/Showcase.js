import mongoose from "mongoose";

const ShowcaseSchema = new mongoose.Schema({});

const Showcase = mongoose.model("Showcase", ShowcaseSchema);

export default Showcase;
