const User = require('../model/userSchema')
module.exports.signIn = (req, res) => {
    return res.render('signInPage')
}

module.exports.signUp = (req, res) => {
    return res.render('signUpPage')
}

module.exports.profile = async (req, res) => {
    // console.log(req.cookies.user_detail);
    const userFromDb = await User.findById(req.cookies.user_detail)
    // console.log(userFromDb);
    return res.render('profilePage', {
        'user': userFromDb
    })
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
    const user = await User.find({ email: req.body.email })
    // console.log(user);
    if (user.length > 0) {

        if (user[0].password == req.body.password) {
            res.cookie('user_detail', user[0].id)
            console.log("matched");
            return res.redirect('/user/profilePage')
        }

        console.log("password don't match");
        return res.redirect('/user/signIn')
    } else {
        console.log("user not found");
        return res.redirect('/user/signUp')
    }
}