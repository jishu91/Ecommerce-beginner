const express = require('express')
const Product = require('../models/Product')
const { isAuthenticated, isAdmin } = require('../middlewares/auth')

const router = express.Router()

// Admin Dashboard
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
    const products = await Product.find()
    res.render('admin/dashboard', { products })
})

// Add Product Page
router.get('/add-product', isAuthenticated, isAdmin, (req, res) => {
    res.render('admin/add-product')
})

// Add Product Logic
router.post('/add-product', isAuthenticated, isAdmin, async (req, res) => {
    const { name, price, description, image } = req.body
    await Product.create({ name, price, description, image })
    res.redirect('/admin')
})
// Edit product page
router.get('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('admin/edit-product', { product })
})

// Update product
router.post('/edit/:id', isAuthenticated, isAdmin, async (req, res) => {
    const { name, price, description, image } = req.body

    await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        description,
        image
    })

    res.redirect('/admin')
})
// Delete product
router.get('/delete/:id', isAuthenticated, isAdmin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/admin')
})

module.exports = router
