const express = require('express')
const Order = require('../models/Order')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1)
        const limit = 5
        const skip = (page - 1) * limit

        // total orders of logged-in user
        const totalOrders = await Order.countDocuments({
            userId: req.session.user._id
        })

        const orders = await Order.find({
            userId: req.session.user._id
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const totalPages = Math.max(Math.ceil(totalOrders / limit), 1)

        res.render('orders', {
            orders,
            currentPage: page,
            totalPages
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Something went wrong')
    }
})

module.exports = router
