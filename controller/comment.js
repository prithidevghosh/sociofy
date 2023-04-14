const Comment = require('../model/commentSchema')
const Post = require('../model/postSchema')

module.exports.create = async (req, res) => {
    try {
        const postFetchedDb = await Post.findById(req.body.post);
        if (postFetchedDb) {
            const commentFetchedDb = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            postFetchedDb.comments.push(commentFetchedDb)
            postFetchedDb.save();
        }
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}