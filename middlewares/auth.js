module.exports = {
    // Checks if the user is logged in
    isAuthenticated: (req, res, next) => {
        if (req.session.user) return next()
        res.redirect('/login') //this goes to "app.use('/', authRoutes)" in server.js"
    },

    isAdmin: (req, res, next) => {
        if (req.session.user?.role === 'admin') {
            return next()
        }

        // Option 1: Redirect to login with query message
        return res.redirect('/login?error=Admin access required')

    }

}
