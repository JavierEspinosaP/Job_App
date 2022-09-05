const users = require ('../models/users')
require('../utils/db_sql')


const getUsersRegistered= async (req,res)=>{
    let usersRegistered;
    if(req.query.id){
        usersRegistered = await users.getUsersByEmail(req.query.email)
      console.log("Estos son los mails de usuarios registrados: ", usersRegistered);
    }else{
        usersRegistered = await admin.getAllUsers()
      console.log("Estos son todos los usuarios registrados");
    }
}

//revisar ruta


module.exports = {
    getUsersRegistered
}
