const express = require('express');
const jwt = require('jsonwebtoken');
const sql = require('../models/admin');

const checkAdmin = express.Router();

checkAdmin.use(async (req, res, next) => {
    const token = (req.headers.cookie).slice(13);
    const users = await sql.getAllUsers()
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = decoded.email
    for (let i = 0; i < users.length; i++) {
        if (users[i].email===user) {
            if (users[i].role === 'admin') {
             next()   
            }}}});

module.exports = checkAdmin;