const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");
const authRouter = require('./routers/auth.router');
const taskRouter = require('./routers/task.router');

const FRONT_END_URL = process.env.FRONT_END_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: [FRONT_END_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  }),
);

app.use(cookieParser());

if (!DB_URL) {
  console.error("DB_URL is missing. Please set it in your .env file.");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to mongodb successfully.");
    })
    .catch((e) => {
      console.error("Mongodb connection error", e.message);
    });
}

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
