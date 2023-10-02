import Review from "../models/Review.js";

// get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// add reivew
export const addReview = async (req, res) => {
  try {
    const doc = req.body;
    const newReview = new Review({ ...doc, status: false });
    const result = await newReview.save();
    res.status(200).json({ acknowledgement: true, review: result });
  } catch (error) {
    res.status(404).json({ error });
  }
};

// delete review
export const deleteReview = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;
    const id = req.params.id;
    if (decoded.email === email) {
      await Review.findByIdAndDelete(id);
      return res.status(200).json({ deletedCount: 1 });
    }
    return res.status(401).json({ message: "unauthorized access" });
  } catch (err) {
    res.status(404).json({ messgae: err.message });
  }
};

// update review
export const updateReview = async (req, res) => {
  try {
    const email = req.query.email;
    const decoded = req.decoded;
    const id = req.params.id;
    const updates = req.body;
    if (decoded.email === email) {
      // Use Mongoose's findByIdAndUpdate to update the document
      const updatedDocument = await Review.findByIdAndUpdate(id, updates, {
        new: true,
      });

      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }

      return res
        .status(200)
        .json({ acknowledgement: true, data: updatedDocument });
    }
    return res.status(401).json({ message: "unauthorized access" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
