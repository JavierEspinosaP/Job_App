const users = require('../models/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../utils/nodemailer'); 
require('dotenv').config()

const signUpUser = async (req, res) => {
    const { name, surname, email, password } = req.body //(name, surname, email, password)
    const hash = await bcrypt.hash(password, 10)
    try {
        await users.registerUser({ name, surname, email, hash })
        await users.loggedStatus(email)
        const response = await users.signInUser({ email, password })
        const payload = {
            email: response[0].email,
            check: true
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600
        })
        res.cookie("access-token", token, {
            httpOnly: true,
            sameSite: "strict"
        }).redirect(`/dashboard_user`)
    }
    catch (err) {
        console.log(err)
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const response = await users.signInUser({ email, password })

        if (email == response[0].email) {
            const validPass = await bcrypt.compare(password, response[0].password)
            if (validPass) {
                users.loggedStatus(email)

                if (response[0].role == 'admin') {
                    const payload = {
                        email: response[0].email,
                        check: true
                    };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })
                    res.cookie("access-token", token, {
                        httpOnly: true,
                        sameSite: "strict"
                    }).redirect(`/dashboard`)
                }
                else if (response[0].role == 'member') {
                    const payload = {
                        email: response[0].email,
                        check: true
                    };
                    const token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })
                    res.cookie("access-token", token, {
                        httpOnly: true,
                        sameSite: "strict"
                    }).redirect(`/dashboard_user`)
                }}}}
    catch (err) {
        console.log(err);
    }

}

const logoutUser = async (req, res) => {
    const cookies = req.headers.cookie;
    const cookieArray = cookies.split("=");
    const token = cookieArray[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const email = decoded.email
    users.logoutUser(email)
    res.redirect('/')
}

const changePassword = async (req, res) => {
    console.log("Hola");
    const {password} = req.body
    
    const token = (req.headers.cookie).slice(13);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userEmail = decoded.email
    const hash = await bcrypt.hash(password, 10)
     try {

        users.changedPassword({password: hash, email: userEmail})
        res.redirect('/dashboard_user')
    } catch (err) {
        console.log(err);
    }
}

const recoverPassword = async (req, res) => {
    const {email} = req.body
    try {
        const token = jwt.sign({ email: req.body.email }, process.env.RECOVER_KEY, { expiresIn: '20m' });
        console.log(token);
        const url = `http://localhost:3005/recoverpass/`+ token;
        console.log(email);
        await transporter.sendMail({
            to: req.body.email,
            subject: 'Recuperación de contraseña',
            html: `<h3>Aquí tienes el link para recuperar tu contraseña</h3>
                <a href = ${url}>Click</a>
                <p>El link expirará en 20 minutos</p>`
        });
        res.redirect('/dashboard_user')
    } catch (error) {
        console.log('Error:', error)
    }
}


module.exports = {
    loginUser,
    signUpUser,
    logoutUser,
    changePassword,
    recoverPassword
}