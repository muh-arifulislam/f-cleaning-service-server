import mongoose from "mongoose";

const ShowcaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Showcase = mongoose.model("Showcase", ShowcaseSchema);

export default Showcase;
