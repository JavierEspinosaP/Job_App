const users = require('../models/users');
const adminModel = require('../models/admin');

const scraper = require('../utils/scraper')

const Swal = require('sweetalert2')


const getHome = async (req, res) => {
    try {
        if (req.user) {
            var user = req.user.email;
            res.render("home", { user });
        } else {
            res.render("home");
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/dashboard_user"

const getDashboardUser = async (req, res) => {
    const user = req.user.email;
    try {
res.render("dashboard_user", { user });
Swal.fire({
            title: 'User logged!',
            icon: 'success',
            confirmButtonText: 'Cool!'
          })


    } catch (error) {
        return res.status(400).json(error);
    }
};

const getProfile = async (req, res) => {
    const profile = req.user.email;
    console.log("Estas en frontControllers getProfile ", profile);
    try {
        console.log(profile);
        data = await users.userProfile(profile)
        res.status(200).render('profile', { data })
    } catch (error) {
        return res.status(400).json(error);
    }
}


const updateUser = async (req, res) => {
    try {
        await adminModel.editUser(req.body);
        res.redirect('/profile');
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({ "message": "Offer not found" });
    }
}



const getUsers = async (req, res) => {
    try {

        res.render("users", { section: "users" });


    } catch (error) {
        return res.status(400).json(error);
    }
};


const getDashboardAdmin = async (req, res) => {
    try {
        res.render("dashboard", { section: "dashboard" });

    } catch (error) {
        return res.status(400).json(error);
    }
};


const changePasswordView = async (req, res) => {
    res.render('change_pass')
}

const resetPasswordView = async (req, res) => {
    res.render('reset_pass')
}


const recoverPasswordView = async (req, res) => {
    res.render('recover_pass')
}


// ***GET DE FAVORITOS

const getFavorites = async (req, res) => {
    const email = req.user.email;
    console.log(email);
    console.log("Estas en frontControllers getFavorites");
    try {

        const userFavs = await users.getFav(email);
        // const userFavs = await users.getFavorites("example@gmail.com");

        // [] array de ofertas con ID de MONGO
        // llamo a las ofertas de mongo con ID en bucle, recorrer array en bucle
        console.log("Estas de vuelta en frontControllers getFav");

        let offers = [];
        for (let i = 0; i < userFavs.length; i++) {
            let offer = {};
            const ref = userFavs[i].reference_offer;
            if (ref.startsWith('https')) {
                console.log("Comienza pr http");
                offer = {
                    title: ref,
                    date: 2022 - 09 - 13,
                    budget: 5000,
                    description: 'Desarrollo FullStack',
                }
            } else { //id mongo
                console.log("Comienza por mongo");

                const mongoOffer = await adminModel.getOffer(ref)

                offer = mongoOffer[0];
            }
            offers.push(offer);
        }

        console.log(offers);
        res.render("favorites", { offers });

    } catch (error) {
        return res.status(400).json(error);
    }
};

//Save favorite
const createFav = async (req, res) => {
    const newFav = req.body;
    // const userEmail = req.user.email;
    console.log("Estas en frontControllers createFav", newFav);
    try {
        const response = await users.createFav(newFav);
        // res.redirect('/');
        // res.status(201).json({ "Fav saved": response })


    } catch (error) {
        console.log(error);
        res.status(404).json({ "message": "Fav not saved" });

    }
}

//Delete favorite
const deleteFav = async (req, res) => {
    if (req.body.url == undefined) {
        const url = req.params.url;
        console.log("Estas en frontController deleteFav if body 0 ", url);
        try {
            await users.deleteFav(url);
            // res.send("Fav deleted")

        } catch (error) {
            console.log(error.message)
            res.status(404).json({ "message": "Fav not deleted" });
        }
    } else {
        const url = req.body.url;

        console.log("Estas en frontController deleteFav if body 1", url);
        try {
            await users.deleteFav(url);
            // res.send("Fav deleted")
        } catch (error) {
            console.log(error.message)
            res.status(404).json({ "message": "Fav not deleted" });
        }
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
    deleteFav,
    createFav,
    getProfile,
    getUsers,
    getDashboardAdmin,
    updateUser,
    changePasswordView,
    resetPasswordView,
    recoverPasswordView,
    getScrap
};