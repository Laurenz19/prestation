const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/database/connection');
var mongoose = require('mongoose');


const app = express();


/**************User */
const User = require('./server/models/user');


/**************Routes require */
const medecinRoutes = require('./server/routes/medecinRoutes');
const patientRoutes = require('./server/routes/patientRoutes');
const traitementRoutes = require('./server/routes/traitementRoutes');
const authRoutes = require('./server/routes/authRoutes');
const router = require('./server/routes/router');
const errorController = require('./server/controller/404');


/*Required to use the file .env*/
dotenv.config({ path: '.env' });

/*Promise mongoose*/
mongoose.Promise = global.Promise;

/**************LOG REQUESTS */
app.use(morgan('tiny'));

/*Set view engine*/
app.set("view engine", "ejs");
app.set('views', 'views');

/*Parse Request to bodyParser*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*load assets folder*/
app.use(express.static(path.join(__dirname, "assets")));

/*Required to read cookies*/
app.use(cookieParser());

app.use((req, res, next) => {
    User.findById('5fec478f9ff06b563fcd85ac')
        .then(user => {
            req.user = user;
            next();

        })
        .catch(err => console.log(err));
});

/*Configuring the express-session middleware*/
app.use(session({
    secret: 'Keep it secret Tatie',
    resave: true,
    saveUninitialized: true
}));

/**************Routes */
app.use(router);
app.use(medecinRoutes);
app.use(patientRoutes);
app.use(traitementRoutes);
app.use(authRoutes);
app.use(errorController.get404);

/*database connection*/
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`The server Nodejs is running on http://localhost:${process.env.PORT}`)
})