const router = require("express").Router()
const auth = require('../middleware/authMiddleware')
const post = require('../controller/postController')

router.get('', auth.validateJWT)
router.post('', auth.validateJWT)

module.exports = router