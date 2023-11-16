const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose
  .connect(
    'mongodb://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PASSWORD +
    '@' +
    process.env.DB_HOST +
    ':' +
    process.env.DB_PORT +
    '/' +
    process.env.DB_NAME,
  )

  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error: ' + err);
  });


module.exports = app;