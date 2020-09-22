const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const category = require("./routes/category");
const product = require("./routes/product");
const cart = require("./routes/cart");
const path = require("path");
const cors = require("cors");
app.use(cors());
env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.w8tzz.mongodb.net/${process.env.MONGO_DB_DATABASE}<?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", category);
app.use("/api", product);
app.use("/api", cart);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
