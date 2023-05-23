require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./src/routers/authRouter.js");
const profileRouter = require("./src/routers/profileRouter.js");
const todosRouter = require("./src/routers/todosRouter.js");
const PORT = 3001;
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(fileUpload({}));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/todos", todosRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
