

const queries = {
    "registerUser": `INSERT INTO users(name, surname, email, password,  role, logged) VALUES($1, $2, $3, $4, 'admin', false)`,
    "createUser": `INSERT INTO users(name, surname, email, password,  role, logged) VALUES($1, $2, $3, $4, $5, false);`,
    "loginUser": "SELECT * FROM users WHERE email = $1",
    "logoutUser": `UPDATE users SET logged = false WHERE email = $1 AND logged = true`,
    "updateStatus": `UPDATE users SET logged = true WHERE email = $1 AND logged = false`,
    "profile": `SELECT name, surname, email FROM users WHERE email = $1`,
    "editDataProfile": `UPDATE users SET name = $1, surname = $2 WHERE email = $3;`,
    "deleteUser": `DELETE FROM users WHERE email = $1`,
    "recoverPassword": `SELECT password FROM users WHERE users.email = $1`,
    "changePassword": `UPDATE users SET password = $1 WHERE users.email = $2`,
    "getAllUsers": "SELECT * FROM users",
    "getUsersByEmail": "SELECT email FROM users",

    "saveFav": `INSERT INTO favorites (user_id, url) VALUES ((SELECT user_id FROM users WHERE email = $1), $2)`,
    "favOffers": `SELECT url FROM favorites INNER JOIN users ON users.user_id= favorites.user_id WHERE users.email = $1`, //traemos ofertas ya guardadas como favs  
    "deleteFav": `DELETE FROM favorites WHERE url = $1`,
}


module.exports = queries;