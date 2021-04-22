const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).send({ 'message': 'Access Denied' })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified,
            next()
    }
    catch (e) {
        res.status(400).send({ 'message': 'Invalid token' })
    }
}

module.exports = auth