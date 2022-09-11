const users = require('../models/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signUpUser = async (req, res) => {
    const {name, surname, email, password} = req.body //(name, surname, email, password)
    const hash = await bcrypt.hash(password, 10)
    try{
        await users.registerUser({name, surname, email, hash})
        res.status(201).redirect('/dashboard_user')
    }
    catch(err){
        console.log(err)
    }

}

const loginUser = async (req, res)=>{
    const {email, password} = req.body
    try{
        const response = await users.signInUser({email, password})
        if (email == response[0].email) {
        const validPass = await bcrypt.compare(password, response[0].password)
        if(validPass){
            users.loggedStatus(email)

            if (response[0].role == 'admin'){
                const payload = {
                    email: response[0].email,
                    check: true
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY,{
                    expiresIn: 3600
                })
                res.cookie("access-token", token, {
                    httpOnly:true,
                    sameSite: "strict"
                }).redirect(`/dashboard`)
            }
            else if (response[0].role == 'member'){
                const payload = {
                    email: response[0].email,
                    check: true
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY,{
                    expiresIn: 3600
                })
                res.cookie("access-token", token, {
                    httpOnly:true,
                    sameSite: "strict"
                }).redirect(`/dashboard_user`)
                console.log(payload.email);
            }
        }
        

        }   
    }
    catch(err){
        console.log(err);
    }
    
}

const logoutUser = async (req, res) => {
    const {email} = req.body
    const response = await users.logoutUser({email})
    console.log(response);
    res.clearCookie("access-token");
    res.render("home");
}


module.exports = {
    loginUser,
    signUpUser,
    logoutUser
}