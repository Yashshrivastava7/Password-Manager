const express = require('express');

const requestHandlers = require('./Handlers/requestHandlers');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/',(req,res) => res.status(200).send('Endpoint Working'));
app.get('/users', requestHandlers.getAllUsers);
app.get('/users/:id', requestHandlers.getAuthUserByID);
app.post('/users', requestHandlers.registerUser);
app.post('/login', requestHandlers.loginUser);
app.post('/:username', requestHandlers.addUserDataForUsername);
app.get('/user_data', requestHandlers.getAllUsersData);
app.get('/:username', requestHandlers.getUserDataForUsername);

app.listen(PORT,() => console.log(`Listening at ${PORT}`));