require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const connection = require("./config/database");
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// config file upload
app.use(fileUpload());

// Config template engine
configViewEngine(app);

// Config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// Declare route
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

(async () => {
    try {
          // using mongoose
//   await connection();

  // using mongodb driver
  // Connection URL
const url = process.env.DB_HOST_WITH_DRIVER;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;

await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const collection = db.collection('customers');

// collection.insertOne({"name": "John"})
// collection.insertOne({"name": "Tien","address": "Ha Noi"})
let a = await collection.findOne({"address": "Ha Noi"})
// console.log('>>> find: ', a);

app.listen(port, hostname, () => {
    console.log(`BackendZero app listening on port ${port}`);
});
    } catch (err) {
        console.log(">>> Error connect to DB: ",err.message);
    }
})();
