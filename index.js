const express = require('express')

require('./utils/dbmongo');
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');

//Middleware 404
const manage404 = require('./middlewares/error404')

const app = express()
const cors = require("cors");
const port = 3000


//Read body from request

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//If routes fail, show error 404
app.use(manage404);

//Owl say you if server works
app.listen(port, () => {
    console.log(cowsay.say(`Server working on http://localhost:${port}`, { cow: owl }))
  });