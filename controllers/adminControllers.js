const users = require ('../models/users')
const admin = require('../models/admin')

require('../utils/db_sql')


const getUsersRegistered = async (req,res)=>{
    let usersRegistered;
    try {
      if(req.query.email){
          usersRegistered = await admin.getUsersByEmail(req.query.email)
        console.log("Estos son los mails de usuarios registrados: ", usersRegistered);
      }else{
          usersRegistered = await admin.getAllUsers()
        console.log("Estos son todos los usuarios registrados");
      }
      res.status(200).render('users', {admin});
    } catch (error) {
      console.log(error.message);
    }
}

// const getUsersRegistered= async(req,res) => {

//   {
//    try{let users = await admin.getUsers();
 
//   res.status(200).render('usersAdmin',{users}); // array [] con las entries encontradas
//  }catch(error){
//    console.log(error.message);
//    }
//  }
//  }



module.exports = {
    getUsersRegistered
}
