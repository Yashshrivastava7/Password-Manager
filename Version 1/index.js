const express = require('express');
const app = express();
const Joi = require('joi')
const PORT = process.env.PORT || 8080;
app.use(express.json());

const Users = [];

app.get('/', (req, res) => {
    res.status(200).send("Endpoint Working")
});

app.get('/users', (req, res) => {
    res.send(Users);
});

app.get('/users/:id', (req, res) => {
    const checker = Users.find(c => c.id === parseInt(req.params.id));
    if (!checker) {
        res.status(404).send("User not found");
    }
    res.send(checker);
});

app.post('/users/register', (req, res) => {
    const new_user = {
        id: Users.length + 1,
        username: req.body.username,
        password: req.body.password,
    }
    const checker = Users.find(c => c.username === new_user.username);
    if (checker) {
        res.status(400).send("User already exists");
    }
    Users.push(new_user);
    res.send(new_user);
});

app.post('/users/login', (req, res) => {
    const checker = Users.find(c => c.username === req.body.username);
    if (!checker) {
        res.status(400).send("User not found");
    } else if (checker.password != req.body.password) {
        res.status(400).send("Wrong password");
    }
    res.send(`Welcome ${checker.username}`);
});

app.listen(PORT, () => console.log(`Listing at port ${PORT}`));