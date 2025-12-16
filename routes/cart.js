const express = require('express')
const Product = require('../models/Product')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

// Add to cart
router.get('/add/:id', isAuthenticated, async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!req.session.cart) {
        req.session.cart = []
    }

    const cartItem = req.session.cart.find(
        item => item.productId === product.id
    )

    if (cartItem) {
        cartItem.quantity += 1
    } else {
        req.session.cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        })
    }

    res.redirect('/cart')
})

// View cart
router.get('/', isAuthenticated, (req, res) => {
    res.render('cart', { cart: req.session.cart || [] })
})

// Remove from cart
router.get('/remove/:id', isAuthenticated, (req, res) => {
    req.session.cart = req.session.cart.filter(
        item => item.productId !== req.params.id
    )
    res.redirect('/cart')
})

module.exports = router
