const router = require('express').Router()

const { sendCommentToPost, deleteComment } = require('../controllers/comment-controller')
const Auth = require('../middlewares/auth-middleware')



router.post('/:productId', Auth, sendCommentToPost)

router.delete('/:commentId/deletecomment', Auth, deleteComment)

module.exports = router