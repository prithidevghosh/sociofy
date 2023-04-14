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
    // try {
    //     const userFetchedDb = await User.findById(req.cookies.user_id)
    //     return res.render('profilePage', {
    //         user: userFetchedDb
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    return res.render('profilePage')

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
    // try {
    //     const userFetchedDb = await User.findOne({ email: req.body.email });
    //     if (userFetchedDb) {
    //         if (userFetchedDb.password == req.body.password) {
    //             res.cookie('user_id', userFetchedDb.id);
    //             return res.redirect('/user/profilePage')
    //         }
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
    return res.redirect('/user/profilePage');
}

module.exports.destroySession = (req, res) => {
    req.logout(() => { });
    return res.redirect('/');
}