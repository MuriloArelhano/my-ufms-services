const PostModel = require('../model/postModel')

exports.createNewUserPost = async (req, res, next) => {
    const { jwtUserId } = req.body
    try {
        let newPost = PostModel.build({ user_id: jwtUserId, description: req.description || null })
        await newPost.save()
    } catch(e){
        next(e)
    }
}