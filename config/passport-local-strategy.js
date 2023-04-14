const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/userSchema')

Passport.use(new LocalStrategy({ 
    usernameField: 'email',
  
},
    function (email, password, done) {
        User.findOne({ email: email }).then(function (user) {
            if (!user || user.password != password) {return done(null, false); }
            return done(null, user);
        }).catch((err)=>{if (err) { return done(err); }});
    }
));

//serializing means extarcting unique thing and setting the cookie like userid

Passport.serializeUser((user, done) => {
    done(null, user.id)
})



//desrializing is extarcting cookie and getting user oject from it
Passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        if(err){
            console.log("error getting user-----> Passport");
            return done(err);
        }
        return done(null, user);
    })
})

//check user authentication 
Passport.checkAuthentication = (req, res, next)=>{
    //this is is method that Passport puts in req
    //if user is authenticated pass to the next cantroller function 
    if(req.isAuthenticated()){
        return next()
    }

    //if user is not signed in
    return res.redirect('/users/sign-in')

}



Passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}





module.exports = Passport;