const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const UserRoute = require('./src/routes/user-route')
const StoreRoute = require('./src/routes/store-route')
const CategoryRoute = require('./src/routes/category-route')
const AddressRoute = require('./src/routes/address-route')
const ProductRoute = require('./src/routes/product-route')
const CommentRoute = require('./src/routes/comment-route')
const CartRoute = require('./src/routes/cart-routes')

const app = express()

dotenv.config()

//Db connection activated
require('./db-connection')

app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.status(200).send('Homepage')
})

app.use('/api/photos', express.static('uploads'))

app.use('/api/user', UserRoute)
app.use('/api/store', StoreRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/address', AddressRoute)
app.use('/api/product', ProductRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/cart',CartRoute)


module.exports = app