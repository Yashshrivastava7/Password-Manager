const express = require('express');
const app = express();
const Joi = require('joi')
const PORT = process.env.PORT || 8080;
const sqlite3 = require('sqlite3').verbose();

app.use(express.json());

app.get('/',(req,res) => {
    res.status(200).send('Endpoint Working')
});

let display_all_users_query = `select * from auth`;
let login_query = `select username,password from auth where username=(?) and password=(?)`;

let db = new sqlite3.Database('database.db' , sqlite3.OPEN_READWRITE , (err) => {
    if(err) {
        return console.log(err.message);
    }
});

app.get('/users',(req,res) => {
    users = [];
    db.all(display_all_users_query,[],(err,rows) => {
        if(err) {
            res.send(err.message);
        }
        rows.forEach((row) => {
            user = {
                id : row.id,
                username : row.username,
                password : row.password
            }
            users.push(user);
        });
        res.status(200).send(users);
    });
});

app.get('/users/:id',(req,res) => {
    let check = false;
    db.all(display_all_users_query,[],(err,rows) => {
        if(err) {
            res.send(err.message);
        }
        rows.forEach((row) => {
            if(parseInt(req.params.id) === row.id) {
                check = true;
                user = {
                    id : row.id,
                    username : row.username,
                    password : row.password
                }
                res.status(200).send(user);
            }
        });
        if(!check){
            res.status(400).send('User not found');
        }
    });
});

app.post('/register',(req,res) => {
    db.run(`insert into auth(username,password) values (?,?)`,[req.body.username,req.body.password],function(err) {
        if(err) {
            res.send(err.message);
        }
        res.status(200).send('User registration successful');
    });
});

app.post('/login',(req,res) => {
    db.get(`select username,password from auth where username = (?)`,[req.body.username],(err,row) => {
        if(err) {
            res.send(err.message);
        }
        else if(row.password === req.body.password) {
            res.status(200).send('Login Successful');
        }
        else {
            res.status(400).send('Inlavid Credentials')
        }
    });
});

app.post('/:username',(req,res) => {
    db.get(`select * from auth where username = (?)`,[req.params.username],(err,row) => {
        if(err){
            res.send(err.message);
        }
        console.log(row.id);
        db.run(`insert into user_data values (?,?,?,?)`,[row.id,req.body.domain,req.body.username,req.body.password],function(err) {
            if(err) {
                res.send(err.message);
            }
            else {
                res.status(200).send('Data added successfully');
            }
        });
    });
});

app.get('/user_data',(req,res) => {
    user_data = [];
    db.all(`select * from user_data`,[],(err,rows) => {
        if(err){
            res.send(err.message);
        }
        rows.forEach((row) => {
            data = {
                id : row.parent_id,
                domain : row.domain,
                username : row.username,
                password : row.password
            }
            user_data.push(data);
        });
        res.status(200).send(user_data);
    });
});

app.get('/:username',(req,res) => {
    db.get(`select * from auth where username = (?)`,[req.params.username],(err,row) => {
        if(err){
            res.send(err.message);
        }
        user_data = [];
        db.all(`select * from user_data where parent_id = (?)`,[row.id],(err,rows) => {
            if(err){
                res.send(err.message);
            }
            rows.forEach((row) => {
                data = {
                    id : row.parent_id,
                    domain : row.domain,
                    username : row.username,
                    password : row.password
                }
                user_data.push(data);
            });
            res.status(200).send(user_data);
        });
    });
});

app.listen(PORT,() => console.log(`Listening at ${PORT}`));