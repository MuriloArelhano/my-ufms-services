const router = require('express').Router()
const auth = require('../middleware/authMiddleware')
const post = require('../controller/postController')

router.use(auth.validateJWT);

router.get('', post.getUserPosts)
router.post('', post.createNewUserPost)
router.delete('', post.deleteUserPost)

router.get('/feed', post.getFeedPosts)

module.exports = router