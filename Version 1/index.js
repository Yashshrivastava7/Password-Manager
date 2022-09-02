const express = require('express');
const app = express();
const Joi = require('joi')
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.get('/',(req,res) => {
    res.status(200).send("Endpoint Working")
});

app.listen(PORT, () => console.log(`Listing at port ${PORT}`));