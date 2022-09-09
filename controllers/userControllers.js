const users = require('../models/users');
const bcrypt = require('bcryptjs')
const userQueries = require('../queries/userQueries')
const pool = require('../utils/db_sql')



const signUpUser = async (req, res) => {
    const {name, surname, email, password} = req.body //(name, surname, email, password)
    const hash = await bcrypt.hash(password, 10)
    try{
        const response = await users.registerUser({name, surname, email, hash})
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
    }

}

const loginUser = async (req, res)=>{
    const {email, password} = req.body
    try{
        const response = await users.signInUser({email, password})
        console.log("ESTO ES RESPONSE");
        console.log(response[0].email);
        console.log("ESTO ES EMAIL");
        console.log(email);
        if (email == response[0].email) {
        const validPass = await bcrypt.compare(password, response[0].password)
        console.log(validPass);
            if(validPass){
                users.loggedStatus(email)
            }
        }
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    loginUser,
    signUpUser
}