const sqlite3 = require('sqlite3').verbose();

const dbQueries = require('../Queries/queries');

const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        return console.log(err.message);
    }
});

exports.getAuthUserByID = (req, res) => {
    db.get(dbQueries.getAuthUserByID({ id: req.params.id }),[], (err,row) => {
        if(err) {
            res.send(err.message);
            return;
        }
        if (row == undefined) {
            res.status(400).send("User not found");
            return;
        }
        if(parseInt(req.params.id) === row.id) {
            res.status(200).send(row);
        }
    });   
}

exports.getAllUsers = (req,res) => {
    users = [];
    db.all(dbQueries.getAllRegisteredUsers(), [], (err,rows) => {
        if(err) {
            res.send(err.message);
        }
        rows.forEach(row => users.push(row));
        res.status(200).send(users);
    });
}

exports.registerUser = (req,res) => {
    db.run(`insert into auth(username,password) values (?,?)`,[req.body.username,req.body.password],function(err) {
        if(err) {
            res.send(err.message);
        }
        res.status(200).send('User registration successful');
    });
}

exports.loginUser = (req,res) => {
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
}

exports.addUserDataForUsername = (req,res) => {
    db.get(`select id from auth where username = (?)`,[req.params.username],(err,row) => {
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
}

exports.getAllUsersData = (req,res) => {
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
}

exports.getUserDataForUsername = (req,res) => {
    db.all(dbQueries.getUserDataForUsername({ username: req.params.username }), [], (err,rows) => {
        if(err){
            res.send(err.message);
            return;
        }
        const user_data = [];
        rows.forEach((row) => {
            user_data.push(row);
        });
        res.status(200).send(user_data);
    });
}