require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require("./config/database");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// Config template engine
configViewEngine(app);

// Config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// Declare route
app.use("/", webRoutes);

const kittySchema = new mongoose.Schema({
  name: String,
});

const Kitten = mongoose.model("Kitten", kittySchema);
const silence = new Kitten({ name: "Hoi dan it Cat" });
silence.save();

(async () => {
  await connection();
  app.listen(port, hostname, () => {
    console.log(`Backend0 app listening on port ${port}`);
  });
})();
