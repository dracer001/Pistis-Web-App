const authAdmin = async (req, res, next) => {
    // Only apply this check to routes that include '/admin'
    if (req.url.includes('/admin')) {
        // Skip the login route
        if (req.url === '/admin/login') {
            return next();
        } else {
            // If there's a session auth flag set, proceed to the next middleware
            if (req.session.auth) {
                return next();
            } else {
                // If not authenticated, redirect to login page and show flash message
                req.flash('error_msg', 'Please log in to view that resource');
                return res.redirect('/admin/login');
            }
        }
    }
    
    // If the request is not part of the admin panel, just proceed to the next middleware
    next();
};

module.exports = authAdmin;
