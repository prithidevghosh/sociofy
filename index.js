const express = require('express')
const port = 3000
const app = express();
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const expresslayout = require('express-ejs-layouts')
const homeroute = require('./route/home')
const passport = require('passport')
const session = require('express-session');
const LocalStrategy = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware')




app.use(express.urlencoded());
app.use(cookieParser());

app.use(expresslayout)
app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

app.use(express.static('./assets'))

app.set('view engine', 'ejs')
app.set('views', './view')



app.use(session({
    name: 'socify',
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://prithidevghosh:39039820@cluster0.3amaqwo.mongodb.net/sociofy",
        autoRemove: 'disabled'
    })
}))

// console.log(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customMware.setFlash);


app.use('/', homeroute);


app.listen(port, (e) => {
    if (e) { console.error("error occured in firing up server"); return; }

    console.log(`server started at port ${port}`);

})