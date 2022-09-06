const userQueries = require('../queries/userQueries')
const pool = require('../utils/db_sql')

//"changePassword": `UPDATE users SET password = $1 WHERE users.email = $2`
const restorePassword = async (req, res, next) => {
    let client;
    const { password, email } = req.query
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.changePassword, [password, email])
        return res.status(200).json("Password cambiado correctamente")
    } catch (err) {
        return next(err);
    } finally {
        client.release();
    }
}
//"recoverPassword":`SELECT password FROM users WHERE users.email = $1`
const recoverPassword = async (req, res, next) => {
    let client, result;
    const { email } = req.query
    try {
        client = await pool.connect();
        const data = await client.query(userQueries.recoverPassword, [email])
        result = data.rows
        return res.status(200).json(result)
    } catch (err) {
        return next(err);
    } finally {
        client.release();
    }
}
module.exports={
    restorePassword,
    recoverPassword
}