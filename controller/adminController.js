
const displayLogin = async (req, res) =>{
    res.render('templates/admin/login', { error_msg: req.flash('error_msg') })
}

const authLogin = async (req, res) =>{
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.auth = true
        res.redirect('dashboard');
    } else {
        req.flash('error_msg', 'Invalid username or password. Please try again.');
        res.redirect('login');
        // const error_msg = 'Invalid username or password. Please try again.';
        // res.render('templates/admin/login', { error_msg });
    }
}

const adminIndex = async(req, res) =>{
    res.render('templates/admin/index')
}

const displayUpload = async(req, res) =>{
    res.render('templates/admin/upload_course')
}

const uploadCourse = async(req, res) =>{
    const formData = req.body
    console.log('GOTTEN DATA')
    console.log(formData)

}
module.exports = {
    displayLogin,
    authLogin,
    adminIndex,
    displayUpload,
    uploadCourse
}