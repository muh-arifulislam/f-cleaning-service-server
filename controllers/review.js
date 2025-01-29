import Review from "../models/Review.js";

// get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    return res.status(404).json({ success: false, message: err?.message });
  }
};

// add reivew
export const addReview = async (req, res) => {
  try {
    const doc = req.body;
    const newReview = new Review({ ...doc, status: false });
    const result = await newReview.save();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(404).json({ success: false, message: error?.message });
  }
};

// delete review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);

    return res.status(200).json({ success: true, data: null });
  } catch (err) {
    return res.status(404).json({ success: false, message: err?.message });
  }
};

// update review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedDocument = await Review.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedDocument) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    return res.status(200).json({ success: true, data: updatedDocument });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
