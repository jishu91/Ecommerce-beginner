const express = require('express')
const Product = require('../models/Product')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

// Show all products (public)
router.get('/', async (req, res) => {
    const products = await Product.find()
    res.render('products', { products, user: req.session.user })
})

// Buy product (login required)
// router.get('/buy/:id', isAuthenticated, async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     res.send(`✅ ${product.name} purchased by ${req.session.user.name}`)
// })

module.exports = router
