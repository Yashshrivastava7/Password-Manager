const express = require('express');
const app = express();
const PORT = 8080;

app.get('/',(req,res) => {
    res.status(200).send("Endpoint Working")
});

app.listen(PORT, () => console.log('Listing at port 8080'));

