const users = require('../models/users');



const signUpUser = async (req, res) => {
    const newUser = req.body //(name, surname, email, password)
    try{
        const response = await users.registeredUser(newUser)
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
    }

}

const loginUser = async (req, res)=>{
    // const {email, password}= req.body
    res.status(200).json(req.body)
}


module.exports = {
    loginUser,
    signUpUser
}