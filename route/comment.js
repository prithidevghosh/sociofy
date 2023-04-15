const express = require('express');
const route = express.Router();
const commentController = require('../controller/comment')
const passport = require('passport')

route.post('/create', passport.checkAuthentication, commentController.create)
route.get('/delete/:id', passport.checkAuthentication, commentController.destroy)

module.exports = route;