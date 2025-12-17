const express = require('express')
const Order = require('../models/Order')
const { isAuthenticated, isAdmin } = require('../middlewares/auth')

const router = express.Router()

// View all orders (admin) with pagination
router.get('/', isAuthenticated, isAdmin, async (req, res) => {

    const page = parseInt(req.query.page) || 1
    const limit = 5                // orders per page
    const skip = (page - 1) * limit

    const totalOrders = await Order.countDocuments()
    const totalPages = Math.ceil(totalOrders / limit)

    const orders = await Order.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    res.render('admin/orders', {
        orders,
        currentPage: page,
        totalPages
    })
})

// Update order status
router.post('/update/:id', isAuthenticated, isAdmin, async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    })

    // stay on same page after update
    const page = req.query.page || 1
    res.redirect(`/admin/orders?page=${page}`)
})

module.exports = router
