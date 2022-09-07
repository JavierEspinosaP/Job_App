
// Módulos externos
require('./utils/dbmongo');
require('./utils/db_sql');
const express = require('express')
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const helmet = require('helmet');

//routes
const frontRoutes = require('./routes/frontRoutes')
const apiRoutes = require("./routes/apiRoutes")


//Middlewares
const manage404 = require('./middlewares/error404')
const app = express()
const cors = require("cors");
const port = 3005
app.use(express.static('public'));

// View engine
app.set('view engine', 'pug');
app.set('views', './views');

//Read body from request

require('./utils/dbmongo');

//Read body from request


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//WEB
app.use('/', frontRoutes);
app.use('/api', apiRoutes);

//If routes fail, show error 404
// app.use(manage404);
// app.use(helmet);
//Owl say you if server works
app.listen(port, () => {
  console.log(cowsay.say(`Server working on http://localhost:${port}`, { cow: owl }))
});