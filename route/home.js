const express = require('express');
const route = express.Router();
const homeController = require('../controller/home.controller')
const userRoute = require('../route/users')

route.get('/', homeController.home)
route.use('/user', userRoute)

module.exports = route;