
const users = require('../models/users');
const adminModel = require('../models/admin');
// const admin = require('../models/admin')

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

// "/dashboard_user"
const getDashboardUser = async (req, res) => {
    try {
        res.render("dashboard_user");

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/favorites"
const getFavorites = async (req, res) => {
    try {
        res.render("favorites", { section: "favorites", list: ["patata"] });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/profile" get profile by email
const getProfile = async (req, res) => {
    console.log("Holi desde frontControllers getProfile");
    const profile = req.user.email;
    try {
        console.log(profile);
        data = await users.userProfile(profile)
        res.status(200).render('profile', { data })
    } catch (error) {
        return res.status(400).json(error);
    }
}

//updateUser
const updateUser = async (req, res) => {
    try {
        await adminModel.editUser(req.body);
        console.log("Holi desde updateOffer controller");
        console.log("Oferta edited: ", req.body);
        res.redirect('/profile');
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "Offer not found" });
    }
}


// "/users"
const getUsers = async (req, res) => {
    try {

        res.render("users", { section: "users" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/dashboard"
const getDashboardAdmin = async (req, res) => {
    try {
        res.render("dashboard", { section: "dashboard" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

//"changePassword": `UPDATE users SET password = $1 WHERE users.email = $2`
const changePasswordView = async (req, res, next) => {
    res.render('change_pass')
}

const resetPasswordView = async (req, res, next) => {
    res.render('reset_pass')
}


//"recoverPassword":`SELECT password FROM users WHERE users.email = $1`
const recoverPasswordView = async (req, res, next) => {
    res.render('recover_pass')
}

//Save Favorite
const saveFavorite = async (req, res, next) => {
    let client;
    const { body } = req.body
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
//Scrapeo
const getScrap = async (req, res) => {
    try {
        
        res.render("scraping", { section: "scraping" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    getHome,
    getDashboardUser,
    getFavorites,
    getProfile,
    getUsers,
    getDashboardAdmin,
    getSearch,
    updateUser,
    changePasswordView,
    resetPasswordView,
    recoverPasswordView,
    saveFavorite,
    deleteFavorite,
    getScrap
};