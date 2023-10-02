import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 30,
    },
    icon: {
      type: String,
      required: true,
    },
    description1: {
      type: String,
      required: true,
      maxlength: 400,
    },
    description2: {
      type: String,
      required: true,
      maxlength: 400,
    },
    addFeature: {
      title: {
        type: String,
        required: true,
        maxlength: 50,
      },
      thumbnailImg: {
        type: String,
        required: true,
      },
      singleFeatures: [
        {
          type: String, // Change the type to match the data type of your single feature
          required: true,
          maxlength: 30,
        },
      ],
    },
    faq: [
      {
        qns: {
          type: String,
          required: true,
        },
        ans: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
