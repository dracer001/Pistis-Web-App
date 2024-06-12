const authAdmin = async (req, res, next) => {
    if(req.url === '/admin-panel/login'){
        console.log(req.url)
        return next();
    } 
    if (req.session.auth) {
        return next();
    } else {
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('login');
    }
}

module.exports = authAdmin