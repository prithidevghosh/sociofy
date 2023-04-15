const express = require('express');
const route = express.Router();
const homeController = require('../controller/home')
const userController = require('../controller/user')
const passport = require('passport')
const LocalStrategy = require('../config/passport-local-strategy')
// console.log(passport);

route.get('/signIn', userController.signIn)
route.get('/signUp', userController.signUp)
route.get('/profilePage/:id', passport.checkAuthentication, userController.profile)
route.post('/createUser', userController.createUser)
route.post('/createSession', passport.authenticate(
    'local', { failureRedirect: '/user/signIn' }
), userController.createSession)
route.get('/signOut', userController.destroySession);
route.post('/update/:id', passport.checkAuthentication, userController.update)

module.exports = route;