const users = require('../models/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const transporter = require('../utils/nodemailer');
const scraper = require('../utils/scraper')
const apiSchema = require('../schemas/offers_admin');
require('dotenv').config()




const getSearch = async (req, res) => {
    try {
        let search = req.query.search
        console.log(search);
        let url = ["https://www.workana.com/jobs?language=en%2Ces", "https://www.freelancer.com/jobs/web-development/"]
        const offers = []
        for (let i = 0; i < url.length; i++) {
            let dataOffers = await scraper.arrScrapers[i](url[i], search)
            offers.push(dataOffers)
        }
        const merged = [].concat.apply([], offers);
        const mongoOffers = await apiSchema.find();
        const allOffers = [...mongoOffers, ...merged];
        res.status(200).json(allOffers)

    }
    catch (error) {
        console.log(error);
    }
}

const signUpUser = async (req, res) => {
    const { name, surname, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    try {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
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
        else {
            console.log(err)
        }
    }
    catch (err) {
        setTimeout(() => {
         console.log(err)
        res.redirect('/')   
        },5000)
        
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)){
       const response = await users.signInUser({ email, password })

        if (email == response[0].email) {
            const validPass = await bcrypt.compare(password, response[0].password)
            if (validPass) {
                await users.loggedStatus(email)
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
                }
            }
        }           
        } 
        else{
            setTimeout(() => {
             res.redirect('/')   
            }, 5000);
            
        }
    }
    catch (err) {
        console.log(err);
        res.redirect('/')
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
    res.clearCookie("access-token")
    setTimeout(() => {
     res.redirect('/')   
    }, 3000);
    
}

const changePassword = async (req, res) => {
    const { password } = req.body

    const token = (req.headers.cookie).slice(13);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userEmail = decoded.email
    const hash = await bcrypt.hash(password, 10)
    try {

        users.changedPassword({ password: hash, email: userEmail })
        res.redirect('/dashboard_user')
    } catch (err) {
        console.log(err);
    }
}

const recoverPassword = async (req, res) => {
    const { email } = req.body
    try {
        const token = jwt.sign({ email: req.body.email }, process.env.RECOVER_KEY, { expiresIn: '20m' });
        console.log(token);
        const url = `http://localhost:3005/recoverpass/` + token;
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

const resetPass = async (req, res) => {

    try {
        let client;
        const token = req.params.recoverToken;
        const payload = jwt.verify(token, process.env.RECOVER_KEY);
        const password = req.body.password
        const user = users.find(u => { return payload.email === u.email });
        if (user) {
            if (regex.validatePassword(pass) && pass == pass2) {
                client = await pool.connect();
                const hashPassword = await bcrypt.hash(pass, 10);
                await client.query(
                    `UPDATE users
                    SET password = ($1)
                    WHERE email = ($2)`, [hashPassword, payload.email]);
                res.status(200).redirect(`${process.env.URL_BASE}/login`);
            }
            else if (pass != pass2) {
                res.send("Passwords dont match");
            }
            else {
                res.status(400).json({ msg: 'Password must have at least 8 characters, one uppercase, one lowercase and one special character' });
            }
        }
        else {
            res.send("No se encontró ninguna dirección de email")
        }
    } catch (error) {
        console.log('Error:', error);
    }
}




module.exports = {
    getSearch,
    loginUser,
    signUpUser,
    logoutUser,
    changePassword,
    recoverPassword,
    resetPass
}