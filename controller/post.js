const Post = require('../model/postSchema');
const Comment = require('../model/commentSchema')
module.exports.create = async (req, res) => {

    try {
        const postFetchedDb = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        // if (req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             post: postFetchedDb
        //         },
        //         message: "post created successfully"
        //     })
        // }
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const postFetchedDb = await Post.findById(req.params.id)
        if (postFetchedDb.user == req.user.id) {
            postFetchedDb.deleteOne();

            try {
                const commentFetchedDb = await Comment.deleteMany({ post: req.params.id });
            } catch (error) {
                console.log(error);
            }
        }
        return res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}