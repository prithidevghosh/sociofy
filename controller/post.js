const Post = require('../model/postSchema');

module.exports.create = async (req, res) => {

    try {
        const postFetchedDb = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}