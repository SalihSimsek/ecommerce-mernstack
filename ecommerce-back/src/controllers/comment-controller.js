const commentValidation = require('../middlewares/comment-middleware')

const CommentService = require('../services/comment-service')
const ProductService = require('../services/product-service')


const sendCommentToPost = async (req, res) => {
    const { error } = commentValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    const productId = req.params.productId
    req.body.user = req.user._id
    req.body.product = productId

    try {
        const comment = await CommentService.add(req.body)
        const product = await ProductService.find({ _id: productId })

        product.comments.push(comment)
        await product.save()
        res.status(201).send(comment)

    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId
    const userId = req.user._id
    try {
        const comment = await CommentService.find({ _id: commentId })
        const product = await ProductService.find({ _id: comment.product })

        const commentUserId = comment.user._id.toString()

        if (commentUserId !== userId) return res.status(401).send({ 'message': 'You have no permission' })
        product.comments.remove(comment)
        await product.save()

        const deletedComment = await CommentService.delete(comment._id)
        if (deletedComment.deletedCount !== 1)
            return res.status(404).send({ 'message': 'Error' })

        res.status(200).send({ 'message': 'Succesfully deleted' })

    } catch (e) {
        res.status(500).send({ 'message': 'Server error' })
    }
}

module.exports = { sendCommentToPost, deleteComment }