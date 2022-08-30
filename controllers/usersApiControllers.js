const authors = require('../models/users')



const getUsers = async (req, res) => {
    try {
        if(req.query.email){
            let entries = await authors.getAuthorByMail(req.query.email);
            return res.status(200).json(entries);  
        } else{
            let entries = await authors.getAllAuthors();
            return res.status(200).json(entries);  
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};


module.exports = {
    getUsers
}