const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/userSchema')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {

        const userdetail = await User.findOne({ email: email });

        if (!userdetail || userdetail.password != password) {
            // console.log(userdetail);
            // console.log(password);
            // req.flash('error', "wrong username/password")
            return done(null, false);
        }
        else {
            return done(null, userdetail);
        }
    } catch (error) {
        return done(error);
    }
}

))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        if (user) {
            return done(null, user);
        }

    } catch (error) {
        return done(error);
    }
})

//check if authenticated

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/user/signIn')
}

// setting authenticated user

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;