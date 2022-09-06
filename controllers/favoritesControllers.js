const userQueries = require('../queries/userQueries')
const pool = require('../utils/db_sql')

const saveFavorite = async (req, res, next) => {
    let client;
    const { body } = req

    try {
        client = await pool.connect();
        const data = await pool.query(userQueries.saveFav)
        //no existe query - falta pasarle los datos

        return res.status(200).json("Favorito guardado correctamente")
    } catch (err) {
        return next(err);
    } finally {
        client.release();
    }
}
//`DELETE FROM favorites WHERE reference_offer = $1`
const deleteFavorite = async (req, res, next) => {
    let client;
    const { reference_offer } = req.params
    try {
        client = await pool.connect();
        const data = await pool.query(userQueries.deleteFav, [reference_offer])
        return res.status(200).json(`Favorito con reference_offer ${reference_offer} eliminado correctamente`)
    } catch (err) {
        return next(err);
    } finally {
        client.release();
    }

}

module.exports = {
    deleteFavorite,
    saveFavorite
}
