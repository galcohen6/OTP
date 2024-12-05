const sqlConnect = require("./config");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

const apiRoutes = require("./routeApi");

sqlConnect;
app.use(cors({ origin: 'http://localhost:5173', }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", apiRoutes);

app.listen(port, '0.0.0.0',() => {
  console.log(`Server listening at http://localhost:${port}`);
});

