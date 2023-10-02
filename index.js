import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import helmet from "helmet";
import morgan from "morgan";
import serviceRoute from "./routes/service.js";
import customerRoute from "./routes/customer.js";
import reviewRoute from "./routes/review.js";
import userRoute from "./routes/user.js";
import showcaseRoute from "./routes/showcase.js";
import generalRoute from "./routes/general.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/", serviceRoute);
app.use("/", customerRoute);
app.use("/", reviewRoute);
app.use("/", userRoute);
app.use("/", showcaseRoute);
app.use("/", generalRoute);

/* STATIC ROUTES */
app.use("/public/uploads/images", express.static("public/uploads/images"));

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
