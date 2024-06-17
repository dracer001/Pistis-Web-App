const fs = require('fs');
const path = require('path');
const COURSE_DB = require('../models/course')
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

// const uploadCourse = async(req, res) =>{
//     await upload.array('course-image')(req, res, (err)=>{
//         if (err instanceof multer.MulterError) {
//             // Multer-specific errors
//             console.log("error message mutler")
//             console.log(err.message)
//             return res.render('templates/admin/index')
//         } else if (err) {
//             console.log("other error message")
//             console.log(err.message)
//             return res.render('templates/admin/index')
//         }
//     })
//     const coursesData = req.body
//     console.log('GOTTEN DATA')
//     console.log(coursesData)
//     console.log(req.files)
//     if(!req.files.length){
//         console.log("file not found")
//         return res.render('templates/admin/index')
//     } 
//     for(let i=0; i<= coursesData['course-name'].length; i++){
//         const result = await COURSE_DB.create({
//             course_title: coursesData['course-name'][i],
//             course_summary: coursesData['course-summary'][i],
//             course_synopsis: coursesData['course-synopsis'][i].split(',').map(item => item.trim()),
//             course_description: coursesData['course-description'][i],
//             course_duration: coursesData['course-duration'][i],
//             course_price: coursesData['course-price'][i],
//             course_tags: coursesData['course-tags'][i].split(',').map(item => item.trim()),
//             course_image: req.files[i].filename
//         })
//         console.log(result)
//         // (result) ? console.log(result) : console.log("erro uploading")
//     }
//     res.send()
// }




// NEWS LETTER
const Newsletter = require('../models/newsletter');

// Function to get all email subscriptions
const getEmails = async (req, res) =>{
    try {
        const emails = await Newsletter.find();
        res.render('templates/admin/newsletters', { emails: emails });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to delete an email subscription
const deleteEmail = async (req, res, next)=>{
    try {
        const email = await Newsletter.findByIdAndDelete(req.params.id);
        if (!email) {
            return res.status(404).send('Email not found');
        }

        res.redirect('/admin-panel/newsletter/all');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// Function to create a new email subscription
const createEmail = async(req, res) =>{
    try {
        const { email } = req.body;
        console.log('BODY DATA')
        console.log(req.body)
        // Check if the email already exists
        const existingEmail = await Newsletter.findOne({ email: email });
        if (existingEmail) {
            req.flash('error_msg', 'Email already subscribed');
            return res.json({'message': 'Email already exists'});
        }

        // Create new email subscription
        const newEmail = new Newsletter({
            email: email
        });
        await newEmail.save();

        req.flash('success_msg', 'Email subscribed successfully');
        res.json({'message': "Email Subsciibed"});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    displayLogin,
    authLogin,
    adminIndex,
    displayUpload,
    getEmails,
    deleteEmail,
    createEmail,
}