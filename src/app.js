const express = require('express');
const { dbConnect } = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

dbConnect();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});