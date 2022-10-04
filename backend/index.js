const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8088;

//use cors

app.use(cors());

// importing routes

const TodoItemRoute = require('./routes/todoItems');

// connecting to mongodb..

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

app.use('/', TodoItemRoute);

app.listen(PORT, () => console.log('Server is connected'));
