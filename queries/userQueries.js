const queries = {
    "getAllUsers" : "SELECT * FROM users",
    "getUsersByEmail": "SELECT email FROM users",
    "loginUser": "SELECT email, password FROM users",
    "updateStatus": "UPDATE users SET logged = true WHERE email = 'xxxx' AND Logged = false",
    "favOffer": "SELECT reference_offer FROM favorites INNER JOIN users ON users.user_id= favorites.user_id WHERE users.email = 'xxxxx@gmail.com'", //valor mail como ejemplo, traemos ofertas ya guardadas como favs
    "registerUser": "INSERT INTO users(name, surname, email, password,  role, logged) VALUES('Xxxx', 'Xxxx', 'xxxxx@gmail.com','xxxxseña1', 'member', false)",
    

}





module.exports = queries;