const express = require('express');
const route = express.Router();
const postController = require('../controller/post')
const passport = require('passport')

// console.log(passport);
route.post('/create', passport.checkAuthentication, postController.create)
route.get('/delete/:id', passport.checkAuthentication, postController.destroy)

module.exports = route;