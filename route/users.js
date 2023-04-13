const express = require('express');
const route = express.Router();
const homeController = require('../controller/home.controller')
const userController = require('../controller/user.controller')
const passport = require('passport')


route.get('/signIn', userController.signIn)
route.get('/signUp', userController.signUp)
route.get('/profilePage', userController.profile)
route.post('/createUser', userController.createUser)
route.post('/createSession', passport.authenticate(
    'local',
    { failureRedirect: '/user/signIn' }
), userController.createSession)


module.exports = route;