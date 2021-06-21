const PostModel = require('../model/postModel')
const WebRequestError = require('http-errors')
const axios = require('axios')
const userServiceEndpoint = `http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}`

exports.createNewUserPost = async (req, res, next) => {
    const { jwtUserId, description } = req.body
    try {
        let newPost = PostModel.build({ user_id: jwtUserId, description: description })
        let createdPost = await newPost.save()
        res.status(200).json(createdPost)
    } catch (e) {
        next(e)
    }
}
exports.updateUserPost = async (req, res, next) => {
    const { jwtUserId, description } = req.body
    try {
        let newPost = PostModel.build({ user_id: jwtUserId, description: description })
        let createdPost = await newPost.save()
        res.status(200).json(createdPost)
    } catch (e) {
        next(e)
    }
}
exports.deleteUserPost = async (req, res, next) => {
    const { jwtUserId, postId } = req.body
    try {
        let post = await PostModel.findByPk(postId)
        if (!post)
            throw new WebRequestError.NotFound("Referencia para o post não foi encontrada")
        if (post.user_id != jwtUserId)
            throw new WebRequestError.Unauthorized("Você não tem autorização para realizar essa ação")

        const result = await post.destroy()
        res.status(200).json({
            result,
            msg: "Post deletado com sucesso"
        })
    } catch (e) {
        next(e)
    }
}

exports.getUserPosts = async (req, res, next) => {
    const { jwtUserId, limit, offset } = req.body
    try {
        let posts = await PostModel.findAndCountAll({
            where: { user_id: jwtUserId },
            limit: limit ? limit : null,
            offset: offset ? offset : null
        })

        res.status(200).json(posts)
    } catch (e) {
        next(e)
    }
}
exports.getFeedPosts = async (req, res, next) => {
    const { usrJwtToken, jwtUserId } = Object.assign({}, req.cookies, req.body, req.get('Authorization'), req.query)
    try {
        let friendIds = await axios.get(`${userServiceEndpoint}/v1/invite/friends/accepted`, {
            params: {
                usrJwtToken: usrJwtToken
            }
        })
        friendIds = friendIds.data.friendIds
        friendIds.push(jwtUserId)
        const feedPosts = await PostModel.findAndCountAll({ where: { user_id: friendIds }, order: [['createdAt', 'DESC']] })
        res.status(200).json(feedPosts)
    } catch (e) {
        next(e)
    }
}