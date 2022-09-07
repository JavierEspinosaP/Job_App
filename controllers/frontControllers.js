
const users = require('../models/users');
const admin = require('../models/admin')

//Traer el scraper
const scraper = require('../utils/scraper')
const fetch = require('node-fetch')

// "/"
const getHome = async (req, res) => {
    try {
        res.render("home", { section: "Home" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// *api/logout - salir de la app
//api/signin - registrarse en la app
// hacer func




const getSearch = async (req, res) => {
    try {
        let search = req.query.search
        console.log(search);
        let url = ["https://www.workana.com/jobs?language=en%2Ces", "https://www.freelancer.com/jobs/web-development/"]
        const offers = []
        for (let i = 0; i < url.length; i++) {
            let dataOffers = await scraper.arrScrapers[i](url[i], search)
            offers.push(dataOffers)
        }
        const merged = [].concat.apply([], offers);

        res.status(200).json(merged)
        
    }
    catch (error) {
        console.log(error);
    }
}


// "/signup"
const getSingup = async (req, res) => {
    try {
        const newUser = req.body;
        const response = await users.registeredUser(newUser, res);
        res.status(201).redirect(`/login`) //hay que redireccionarlo???
        //res.render("singup", { section: "singup" });

    } catch (error) {
        //return res.status(400).json(error);
        console.log("Error:", error)
    }
};

// "/login"
const getLogin = async (req, res) => {
    try {
        res.render("login", { section: "login" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/favorites"
const getFavorites = async (req, res) => {
    try {
        res.render("favorites", { section: "favorites" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/profile"
const getProfile = async (req, res) => {
    try {
        res.render("profile", { section: "profile" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/users"
const getUsers = async (req, res) => {
    try {
        
        res.render("users", { section: "users" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/dashboard"
const getDashboard = async (req, res) => {
    try {
        res.render("dashboard", { section: "dashboard" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/scrap"

const getScrap = async (req, res) => {
    try{
        const offers = await scraper.scrap("https://ticjob.es/esp/freelances-it")
        res.status(200).json(offers)
    }
    catch (err){
        res.status(404).json({})
    }
}

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
    getHome,
    getSingup,
    getLogin,
    getFavorites,
    getProfile,
    getUsers,
    getDashboard,
    getScrap,
    getSearch,
    restorePassword,
    recoverPassword,
    saveFavorite,
    deleteFavorite
};