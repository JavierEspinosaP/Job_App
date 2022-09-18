const users = require('../models/users');
const adminModel = require('../models/admin');
const apiSchema = require('../schemas/offers_admin');
//Traer el scraper
const scraper = require('../utils/scraper')

const Swal = require('sweetalert2')


const getHome = async (req, res) => {
    try {
        res.render("home", { section: "Home" });

    } catch (error) {
        return res.status(400).json(error);
    }
};



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
        //Traer ofertas de mongo

        const mongoOffers = await apiSchema.find();
        // merged.concat(mongoOffers);
        // mongoOffers.concat(merged);
        const allOffers = [...mongoOffers, ...merged];
        res.status(200).json(allOffers)

    }
    catch (error) {
        console.log(error);
    }
}

// "/dashboard_user"
const getDashboardUser = async (req, res) => {
    try {
        res.render("dashboard_user");
        Swal.fire({
            title: 'User logged!',
            icon: 'success',
            confirmButtonText: 'Cool!'
          })

    } catch (error) {
        return res.status(400).json(error);
    }
};


// "/profile"
const getProfile = async (req, res) => {
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

// //Save Favorite
// const saveFavorite = async (req, res, next) => {
//     let client;
//     const { body } = req.body
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
            if (ref.startsWith('https')) {
                offer = {
                    title: ref,
                    date: 2022 - 09 - 13,
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
        res.render("favorites", { section: "favorites", offers });

    } catch (error) {
        return res.status(400).json(error);
    }
};




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
    getScrap
};