const express = require('express')
const Order = require('../models/Order')
const { isAuthenticated, isAdmin } = require('../middlewares/auth')

const router = express.Router()

// View all orders (admin)
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
    const orders = await Order.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })

    res.render('admin/orders', { orders })
})

// Update order status
router.post('/update/:id', isAuthenticated, isAdmin, async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    })

    res.redirect('/admin/orders')
})

module.exports = router
