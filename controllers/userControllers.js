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
        const response = await users.logInUser({email, password})
        for (let i = 0; i < response.length; i++) {
            if (email == response[i].email) {
        
            const validPass = await bcrypt.compare(password, response[i].password)
            if(validPass){
                try {
                    
                    client = await pool.connect();
                    const data = await client.query(userQueries.updateStatus, [response[i].email])
                    result = data.rows
                    console.log(response[i].email);
                } catch (err) {
                    console.log(err);
                    throw err;
                }finally{
                    client.release(); 
                    res.status(200).json()   
                }
                return result
            }}}
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    loginUser,
    signUpUser
}