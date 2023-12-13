import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import recipeRouter from "./routes/recipe.js";
import CommentRoutes from "./Comments/routes.js";
import session from "express-session";
import "dotenv/config";

const app = express();
const NETIFLY_URL = "https://main--comforting-kulfi-00884b.netlify.app";
const FRONTEND_URL = NETIFLY_URL || 'http://localhost:3000';
const ALLOWED_ORIGINS = [FRONTEND_URL, "http://localhost:3000"];
app.use(morgan("dev")); // log every request to the console
app.use(express.json({ limit: "30mb", extended: true })); // used to parse incoming request bodies with JSON payloads. It parses the incoming JSON data and makes it available in the req.body object.
app.use(express.urlencoded({ limit: "30mb", extended: true })); // used to parse incoming request bodies with URL-encoded payloads.
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/recipe", recipeRouter); // http://localhost:5000/recipe
// app.use(CommentRoutes);

CommentRoutes(app);

const MONGODB_URL =
  "mongodb+srv://wangjiayususan:AIjiayu0129@cluster0.onugccx.mongodb.net/meal?retryWrites=true&w=majority";

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

mongoose.connect(MONGODB_URL);
// .then(() => {

// })
// .catch((error) => {
//   console.log(`${error} did not connect`);
// });
