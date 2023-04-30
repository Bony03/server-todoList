const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./src/routers/authRouter");
const profileRouter = require("./src/routers/profileRouter");
const todosRouter = require("./src/routers/todosRouter");
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
    await mongoose.connect(
      "mongodb+srv://bvorush:LHx2WZbsq5eR3pte@todoapp.cxlnfki.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
