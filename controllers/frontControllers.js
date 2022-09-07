
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
        res.render("singup", { section: "singup" });

    } catch (error) {
        return res.status(400).json(error);
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

module.exports = {
    getHome,
    getSingup,
    getLogin,
    getFavorites,
    getProfile,
    getUsers,
    getDashboard,
    getScrap,
    getSearch
};