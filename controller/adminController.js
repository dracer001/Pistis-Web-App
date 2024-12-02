const fs = require('fs');
const path = require('path');
const Gallary = require('../models/gallary')

const displayLogin = async (req, res) =>{
    res.render('admin/login', { error_msg: req.flash('error_msg') })
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
    res.render('admin/index')
}

const uploadGallaryForm = async(req, res) =>{
    res.render('admin/upload-gallary')
}

const addGallary = async (req, res) => {
    try {
        const { caption } = req.body;
        const { file } = req;  // Use `file` to access the uploaded file

        if (!caption || !file) {
            req.flash('error_msg', 'Caption and image are required');
            return res.redirect('/admin/upload-gallary');
        }

        // Check if file validation failed
        if (req.fileValidationError) {
            req.flash('error_msg', req.fileValidationError);
            return res.redirect('/admin/upload-gallary');
        }

        // Create a new image entry in the database
        const newImage = new Gallary({
            gallary_caption: caption,
            gallary_file_path: file.path, // Store the local path of the uploaded file
        });

        await newImage.save();

        req.flash('success_msg', 'File uploaded successfully');
        return res.redirect('/admin/upload-gallary');
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Error uploading image');
        return res.redirect('/admin/upload-gallary');
    }
};
  
  // Route to fetch an image by its path
//   app.get('/image/:filename', (req, res) => {
//     const { filename } = req.params;
  
//     // Send the image file located in '/uploads/images'
//     res.sendFile(path.join(__dirname, 'uploads', 'images', filename));
//   });
  
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





module.exports = {
    displayLogin,
    authLogin,
    adminIndex,
    uploadGallaryForm,
    addGallary
}