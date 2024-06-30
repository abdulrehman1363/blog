const express = require('express');
const app = express();
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const routes = require('./routes');
const bodyParser = require('body-parser');
const { PORT, NODE_ENV } = require("./config/env");
const cors = require('cors');

// load environment variables
dotenv.config();

// Connect to database
connectDB();

app.use(express.json())
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(routes)


app.listen(PORT, () => {
    console.log(`app listening on ${PORT} and mode ${NODE_ENV}`)
})