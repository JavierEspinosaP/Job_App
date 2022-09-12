require('./utils/dbmongo');
require('./utils/db_sql');
const express = require('express')
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const helmet = require('helmet');
const morgan = require('./utils/morgan');


const frontRoutes = require('./routes/frontRoutes')
const apiRoutes = require('./routes/apiRoutes')

const manage404 = require('./middlewares/error404')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 3005
app.use(express.static('public'));

// View engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
//WEB
app.use('/', frontRoutes);
app.use('/api', apiRoutes);

//If routes fail, show error 404
app.use(manage404);
app.use(helmet);

//Owl say you if server works
app.listen(port, () => {
  console.log(cowsay.say(`Server working on http://localhost:${port}`, { cow: owl }))
});