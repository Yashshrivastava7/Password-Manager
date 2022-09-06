const express = require('express');
const app = express();
const Joi = require('joi')
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.listen(PORT,console.log(`Listening at ${PORT}`));