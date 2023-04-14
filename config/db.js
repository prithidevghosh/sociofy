const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1/testss"

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', () => {
    console.log("error in starting db");
})

db.on('connected', () => {
    console.log("connected to db");
})

module.exports = db