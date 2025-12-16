const express = require('express')
const session = require('express-session')
const path = require('path')
require('dotenv').config()
const productRoutes = require('./routes/product')
const connectDB = require('./config/db')
const cartRoutes = require('./routes/cart')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const checkoutRoutes = require('./routes/checkout')
const orderRoutes = require('./routes/orders')
const adminOrderRoutes = require('./routes/adminOrders')

const app = express()

connectDB() //db connection

app.use(express.urlencoded({ extended: true }))


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use((req, res, next) => {
    res.locals.user = req.session.user || null
    next()
})
app.use((req, res, next) => {
    res.locals.req = req
    next()
})



app.use(express.static(path.join(__dirname, 'public')))


app.set('view engine', 'ejs')

app.use('/', authRoutes)

app.use('/admin', adminRoutes)


app.use('/', productRoutes)

app.use('/products', productRoutes)

app.use('/cart', cartRoutes)

app.use('/checkout', checkoutRoutes)

app.use('/orders', orderRoutes)

app.use('/admin/orders', adminOrderRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`)
})
