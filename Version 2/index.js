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

let db = new sqlite3.Database('database.db' , sqlite3.OPEN_READWRITE , (err) => {
    if(err){
        return console.log(err.message);
    }
});

app.get('/users',(req,res) => {
    users = [];
    db.all(display_all_users_query,[],(err,rows) => {
        if(err){
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
        if(err){
            res.send(err.message);
        }
        rows.forEach((row) => {
            if(parseInt(req.params.id) === row.id){
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
    db.run(`insert into auth(username,password) values(?,?)`,[req.body.username,req.body.password],function(err) {
        if(err){
            res.send(err.message);
        }
        res.status(200).send('User registration successful');
    });
});

app.listen(PORT,() => console.log(`Listening at ${PORT}`));