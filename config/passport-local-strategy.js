const passport = require('passport');
const User = require('../model/userSchema');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {
        try {
            const userFetchedDb = await User.findOne({ email: email });
            if (!userFetchedDb || password != userFetchedDb.password) {
                console.log("user not found/password not matching");
                return done(null, false);
            }
            else {
                return done(null, userFetchedDb);
            }
        } catch (error) {
            return done(error);
        }
    }

))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const userFetchedDb = await User.findById(id);
        if (userFetchedDb) {
            return done(null, userFetchedDb);
        }
    } catch (error) {
        return done(error);
    }
})

passport.checkAuthentication = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/user/signIn')
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
    }

}


module.exports = passport;