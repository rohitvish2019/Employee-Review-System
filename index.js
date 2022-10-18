const express = require('express');
const cookieParser = require('cookie-parser');
const { request } = require('http');
const app = express();
const httpPort = process.env.PORT || 80;
const expressLayouts = require('express-ejs-layouts');
const securePort = 443;
const db = require('./configs/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ejs = require('ejs');
const MongoStore = require('connect-mongo');
const passportLocal = require('./configs/passport-local-strategy');
const flash = require('connect-flash');
const customMiddleWare = require('./configs/middleware');
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended:true}));


app.use(express.static('./assets'));
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'EmployeeReview',
    // TODO change the secret before deployment in production mode
    secret: 'getitDone',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/employee_reviews',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));
app.use(flash());
app.use(customMiddleWare.setFlash);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));


app.listen(httpPort, function(err){
    if(err){
        console.log("Error starting node server "+err);
        return;
    }
    console.log("Employe Review System Application started on port "+httpPort);
});


