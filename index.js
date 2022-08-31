// Módulos externos
require('./utils/dbmongo');
require('./utils/db_sql');
const express = require('express')
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');

//routes
const userRoutes = require('./routes/usersApiRoutes')

//Middlewares
const manage404 = require('./middlewares/error404')
const app = express()
const cors = require("cors");
const port = 3005

// View engine
app.set('view engine', 'pug');
app.set('views', './views');

//Read body from request
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//ENDPOINTS
//WEB
// app.use('/', frontRoutes);
app.use('/users', userRoutes);

//If routes fail, show error 404
app.use(manage404);
//Owl say you if server works
app.listen(port, () => {
  console.log(cowsay.say(`Server working on http://localhost:${port}`, { cow: owl }))
});