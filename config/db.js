const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://prithidevghosh:39039820@cluster0.3amaqwo.mongodb.net/sociofy"

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', () => {
    console.log("error in starting db");
})

db.on('connected', () => {
    console.log("connected to db");
})

module.exports = db