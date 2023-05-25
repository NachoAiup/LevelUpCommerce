require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const paymentRouter = require("./routes/payment");

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/payment", paymentRouter);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

module.exports = app;
