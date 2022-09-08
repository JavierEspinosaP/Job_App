// const users = require ('../models/users')
const admin = require('../models/admin');

require('../utils/db_sql')


const getUsersRegistered = async (req,res)=>{
    let usersRegistered;
    try {
      if(req.query.email){
          usersRegistered = await admin.getUsersByEmail(req.query.email)
        console.log("Este es el usuario registrado con el mail introducido: ", usersRegistered);
        res.status(200).json(usersRegistered)
      }else{
          usersRegistered = await admin.getAllUsers()
        console.log("Estos son todos los usuarios registrados");
        res.status(200).render('users', {results: usersRegistered})
      }
    } catch (error) {
      console.log(error.message);
    }
}


module.exports = {
    getUsersRegistered
}
