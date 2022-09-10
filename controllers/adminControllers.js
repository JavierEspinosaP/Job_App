// const users = require ('../models/users')
const admin = require('../models/admin');

require('../utils/db_sql')


const getUsersRegistered = async (req,res)=>{
    let usersRegistered;
    try {
        usersRegistered = await admin.getAllUsers()
        res.status(200).render('users', {results: usersRegistered})
      
    } catch (error) {
      console.log(error.message);
    }
}


const createUser = async(req,res) =>{
  const newUser = req.body;
  try {
      const response = await admin.createNewUser(newUser,
        { method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      res.status(201).json({"User created": response})

  } catch (error) {
      console.log(error);
    res.status(404).json({ "message": "user not created" });
    
  }
}



const editUser = async(req,res)=>{
  const editedUser= req.body
  try{
    const response = await admin.editUser(editedUser,
      { method: "PUT",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(editedUser)})
    res.status(200).json({"User edited": response})
    }
  catch(error){
    res.status(400).json({"message":"User can not be edited"});
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
    editUser,
    deleteUser
}
