const User = require('../model/userSchema')
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profilePage')
    }
    return res.render('signInPage')
}

module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profilePage')
    }
    return res.render('signUpPage')

}

module.exports.profile = async (req, res) => {
    try {
        const userFetchedDb = await User.findById(req.params.id);
        if (userFetchedDb) {
            return res.render('profilePage', {
                user_profile: userFetchedDb
            })
        }
    } catch (error) {
        console.log(error);
    }


}


module.exports.createUser = async (req, res) => {

    if (req.body.password != req.body.confirm_password) {

        return res.redirect('back');
    }
    try {

        const user = await User.find({ email: req.body.email })

        if (user.length === 0) {

            await User.create(req.body)
                .then(() => {
                    return res.redirect('/user/signIn')
                })
                .catch((e) => {
                    console.log(e);
                    return res.redirect('back');
                })
        }
    } catch (error) {
        console.log(e);
        return res.redirect('back');
    }


}

module.exports.createSession = async (req, res) => {
    req.flash('success', 'logged in successfully')
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {

    req.logout(() => { });
    req.flash('success', 'logged out successfully')
    return res.redirect('/');
}

module.exports.update = async (req, res) => {
    try {
        const userFetchedDb = await User.findById(req.params.id);
        if (userFetchedDb.id == req.user.id) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error);
    }
}