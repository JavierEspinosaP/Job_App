const queries = {
    "getAllUsers" : "SELECT * FROM users",
    "getUsersByEmail": "SELECT email FROM users",
    "loginUser": "SELECT email, password FROM users",
    "updateStatus": `UPDATE users SET logged = true WHERE email = $1 AND logged = false`,
    "favOffers": `SELECT reference_offer FROM favorites INNER JOIN users ON users.user_id= favorites.user_id WHERE users.email = $1`, //traemos ofertas ya guardadas como favs
    "profile": `SELECT name, surname, email, role WHERE users.email = $1`,
    "registerUser": `INSERT INTO users(name, surname, email, password,  role, logged) VALUES($1, $2, $3,$4, 'member', false)`,
    "editDataProfile": `UPDATE users SET surname = $1 WHERE name = $2 AND surname = $3`,
    "logoutUser": `UPDATE users SET logged = false WHERE email = $1 AND logged = true`,
    "saveFav": ``,
    "deleteFav": `DELETE FROM favorites WHERE reference_offer = $1`,
    "recoverPassword":``,
    "changePasword": ``
}





module.exports = queries;