// const users = require ('../models/users')
const admin = require('../models/admin');

require('../utils/db_sql')


const getUsersRegistered = async (req,res)=>{
    let usersRegistered;
    try {
          usersRegistered = await admin.getAllUsers()
        console.log("Estos son todos los usuarios registrados");
        res.status(200).render('users', {results: usersRegistered})
      
    } catch (error) {
      console.log(error.message);
    }
}

const createUser = async (req, res) => {
  let newUser;
  try {
    newUser= await admin.createNewUser()
    res.status(201).json({"User created": newUser})
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ "message": "user not created" });
  }
}



const deleteUser = async (req, res) => {
  const userMail = req.query.email;
   try {
    const response = await admin.deleteUser(userMail);
    res.status(200).json({"User deleted": response})

   } catch (error) {
    console.log(error.message)
    res.status(404).json({ "message": "user not deleted" });
   }
}


module.exports = {
    getUsersRegistered,
    createUser,
    deleteUser
}
