const express = require('express');
const route = express.Router();
const postController = require('../controller/post')
const passport = require('passport')

// console.log(passport);
route.post('/create', passport.checkAuthentication, postController.create)

module.exports = route;