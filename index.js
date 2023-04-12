const express = require('express')
const port = process.env.PORT || 3000
const app = express();
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const expresslayout = require('express-ejs-layouts')
const homeroute = require('./route/home')

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expresslayout)

app.use(express.static('./assets'))



app.use('/', homeroute);

app.set('view engine', 'ejs')
app.set('views', './view')

app.listen(port, (e) => {
    if (e) { console.error("error occured in firing up server"); return; }

    console.log(`server started at port ${port}`);

})