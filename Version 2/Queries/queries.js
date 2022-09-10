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