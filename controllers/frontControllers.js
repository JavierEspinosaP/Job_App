const users = require('../models/users');
const adminModel = require('../models/admin');

const scraper = require('../utils/scraper')

const Swal = require('sweetalert2')


const getHome = async (req, res) => {
    try {
        res.render("home", { section: "Home" });

    } catch (error) {
        return res.status(400).json(error);
    }
};


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



const getFavorites = async (req, res) => {
    const email = req.query.email;
    try {
        const userFavs = await users.getFavorites("example@gmail.com");
        
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
            } else {
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
    updateUser,
    changePasswordView,
    resetPasswordView,
    recoverPasswordView,
    getScrap
};