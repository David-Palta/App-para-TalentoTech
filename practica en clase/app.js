
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require('./config/mongo.js');

const app = express();
app.use(cors());

const port = process.env.port || 30000;

app.listen(port, () => console.log('Este es el puerto:: ', port));

dbConnect();