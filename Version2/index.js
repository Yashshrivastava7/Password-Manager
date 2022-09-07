const express = require('express');
const app = express();
const Joi = require('joi')
const PORT = process.env.PORT || 8080;
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:');

app.use(express.json());

app.get('/',(req,res) => {
    res.status(200).send('Endpoint Working')
});

app.listen(PORT,() => console.log(`Listening at ${PORT}`));