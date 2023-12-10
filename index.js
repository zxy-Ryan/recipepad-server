import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import CommentRoutes from "./Comments/routes.js"

const app = express();

app.use(morgan("dev")); // log every request to the console
app.use(express.json({ limit: "30mb", extended: true })); // used to parse incoming request bodies with JSON payloads. It parses the incoming JSON data and makes it available in the req.body object.
app.use(express.urlencoded({ limit: "30mb", extended: true })); // used to parse incoming request bodies with URL-encoded payloads.
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
// app.use(CommentRoutes); 

CommentRoutes(app);

const MONGODB_URL =
  "mongodb+srv://wangjiayususan:AIjiayu0129@cluster0.onugccx.mongodb.net/meal?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
