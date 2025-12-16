const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = express.Router()

// Register Page
router.get('/register', (req, res) => {
    res.render('auth/register')
})

// Register Logic
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.send("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.redirect('/login')
})

// Login Page
router.get('/login', (req, res) => {
    res.render('auth/login')
})

// Login Logic
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.send("User not found")

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.send("Wrong password")

        // Save user in session
        req.session.user = user

        // Redirect based on role
        if (user.role === 'admin') {
            return res.redirect('/admin') // admin dashboard
        } else {
            return res.redirect('/') // normal user
        }

    } catch (err) {
        console.error(err)
        res.send("Something went wrong")
    }
})

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

module.exports = router
