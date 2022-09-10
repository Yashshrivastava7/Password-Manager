/*
DB SCHEMA

CREATE TABLE auth ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR,
    password VARCHAR
);

CREATE TABLE user_data (
    parent_id integer,
    Domain varchar,
    username varchar,
    password varchar,
    foreign key (parent_id) references auth(id) on delete cascade
);
*/

const dbQueries = {

    getUserDataForUsername: (params) => `SELECT user_data.parent_id, user_data.Domain, user_data.username, user_data.password
                    FROM user_data INNER JOIN auth
                    ON user_data.parent_id = auth.id
                    WHERE auth.username = "${params.username}"`,

    getAuthUserByID: (params) => `SELECT *
                                  FROM auth
                                  WHERE id = ${params.id}`,

    getAllRegisteredUsers: () => `SELECT *
                                  FROM auth`,

}

module.exports = dbQueries;