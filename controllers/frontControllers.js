// const Front = require('../models/frontModels')

// "/"
const getHome = async (req, res) => {
    try {
        res.render("home", { section: "Home" });

    } catch (error) {
        return res.status(400).json(error);
    }
};

// "/singup"
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

module.exports = {
    getHome,
    getSingup,
    getLogin,
    getFavorites,
    getProfile,
    getUsers,
    getDashboard
};