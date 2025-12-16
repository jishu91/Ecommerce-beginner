const express = require('express')
const Order = require('../models/Order')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.get('/', isAuthenticated, async (req, res) => {
    const cart = req.session.cart

    if (!cart || cart.length === 0) {
        return res.redirect('/cart')
    }

    let total = 0
    cart.forEach(item => {
        total += item.price * item.quantity
    })

    await Order.create({
        userId: req.session.user._id,
        items: cart,
        totalAmount: total
    })

    // clear cart after checkout
    req.session.cart = []

    res.render('checkout-success', { total })
})



module.exports = router
