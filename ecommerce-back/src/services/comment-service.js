const BaseService = require('./base-service')
const CommentModel = require('../models/comment-model')

class CommentService extends BaseService {
    model = CommentModel
}

module.exports = new CommentService()