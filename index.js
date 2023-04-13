const express = require('express')
const port = 3000
const app = express();
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const expresslayout = require('express-ejs-layouts')
const homeroute = require('./route/home')
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')


app.use(express.urlencoded());
app.use(cookieParser());

app.use(expresslayout)

app.use(express.static('./assets'))





app.set('view engine', 'ejs')
app.set('views', './view')



app.use(session({
    name: 'socify',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 }
}))

app.use(passport.initialize());
app.use(passport.session());


// app.use(passport.setAuthenticatedUser)

app.use('/', homeroute);

app.listen(port, (e) => {
    if (e) { console.error("error occured in firing up server"); return; }

    console.log(`server started at port ${port}`);

})