const express = require('express');
const route = express.Router();
const homeController = require('../controller/home')
const userRoute = require('./users')
const postRoute = require('./posts')
const commentRoute = require('./comment')

route.get('/', homeController.home)
route.use('/user', userRoute)
route.use('/post', postRoute)
route.use('/comment', commentRoute)

module.exports = route;