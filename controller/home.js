const Post = require('../model/postSchema')
const User = require('../model/userSchema')
module.exports.home = async (req, res) => {
    try {
        const allPostsFetchedDb = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec();

        return res.render('homepage', {
            post: allPostsFetchedDb
        })
    } catch (error) {
        console.log(error);
    }

}