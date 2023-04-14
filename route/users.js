const express = require('express');
const route = express.Router();
const passport = require('passport')
const homeController = require('../controller/home.controller')
const userController = require('../controller/user.controller')



route.get('/signIn', userController.signIn)
route.get('/signUp', userController.signUp)




route.post('/createUser', userController.createUser)
route.post('/createSession', passport.authenticate(
    'local',
    { failureRedirect: '/user/signIn' }
), userController.createSession)

route.get('/profilePage', passport.checkAuthentication, userController.profile)


module.exports = route;