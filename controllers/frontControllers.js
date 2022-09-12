const users = require('../models/users');
const admin = require('../models/admin')

//Traer el scraper
const scraper = require('../utils/scraper')
const fetch = require('node-fetch')

const getHome = async (req, res) => {
    try {
        res.render("home", { section: "Home" });

    } catch (error) {
        return res.status(400).json(error);
    }
};



const getSearch = async (req, res) => {    try {
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
const getDashboardAdmin = async (req, res) => {
    try {
        res.render("dashboard", { section: "dashboard" });

    } catch (error) {
        return res.status(400).json(error);
    }
};


//"changePassword": `UPDATE users SET password = $1 WHERE users.email = $2`
const changePasswordView = async (req, res) => {
    res.render('change_pass')
}

const resetPasswordView = async (req, res) => {
    res.render('reset_pass')
}


//"recoverPassword":`SELECT password FROM users WHERE users.email = $1`
const recoverPasswordView = async (req, res) => {
    res.render('recover_pass')
}


// ***GET DE FAVORITOS
const getFavorites = async (req, res) => { 
    const email = req.query.email;
    try {

        //const userFavs = await users.getFavorites(email); 
        const userFavs = await users.getFavorites("example@gmail.com"); 
            
        // [] array de ofertas con ID de MONGO
        // llamo a las ofertas de mongo con ID en bucle, recorrer array en bucle
        
        let offers = [];
        for (let i = 0; i < userFavs.length; i++) {
            let offer = {};
            const ref = userFavs[i].reference_offer;
            if(ref.startsWith('https')){
                offer = {
                    title: ref,
                    date: 2022-09-13,
                    budget: 5000,
                    description: 'Desarrollo FullStack',
                  }
                  
                
            } else { //id mongo
                const mongoOffer = await admin.getOffer(ref)
                offer = mongoOffer[0];
            }
            offers.push(offer);
        }
        console.log(offers);
        res.render("favorites", {section: "favorites", offers});

    } catch (error) {
        return res.status(400).json(error);
    }
};





// const saveFavorite = async (req, res, next) => {
//     let client;
//     const { body } = req

//     try {
//         client = await pool.connect();
//         const data = await pool.query(userQueries.saveFav)
//         //no existe query - falta pasarle los datos

//         return res.status(200).json("Favorito guardado correctamente")
//     } catch (err) {
//         return next(err);
//     } finally {
//         client.release();
//     }
// }

//`DELETE FROM favorites WHERE reference_offer = $1`
// const deleteFavorite = async (req, res, next) => {
//     let client;
//     const { reference_offer } = req.params
//     try {
//         client = await pool.connect();
//         const data = await pool.query(userQueries.deleteFav, [reference_offer])
//         return res.status(200).json(`Favorito con reference_offer ${reference_offer} eliminado correctamente`)
//     } catch (err) {
//         return next(err);
//     } finally {
//         client.release();
//     }

// }

module.exports = {
    getHome,
    getDashboardUser,
    getFavorites,
    getProfile,
    getUsers,
    getDashboardAdmin,
    getSearch,
    changePasswordView,
    resetPasswordView,
    recoverPasswordView,
    // saveFavorite,
    // deleteFavorite
};