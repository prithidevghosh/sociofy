const express = require('express');
const route = express.Router();
const homeController = require('../controller/home.controller')
const userController = require('../controller/user.controller')
const userRoute = require('../route/users')

route.get('/signIn', userController.signIn)
route.get('/signUp', userController.signUp)


module.exports = route;