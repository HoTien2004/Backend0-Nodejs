require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const connection = require("./config/database");
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
app.use("/v1/api/", apiRoutes);

(async () => {
  await connection();
  app.listen(port, hostname, () => {
    console.log(`Backend0 app listening on port ${port}`);
  });
})();
