const router = require("express").Router()
const auth = require('../middleware/authMiddleware')
const post = require('../controller/postController')

router.get('', auth.validateJWT, post.createNewUserPost)

module.exports = router