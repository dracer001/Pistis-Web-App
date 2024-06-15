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


const uploadCourse = async (req, res) => {

    // Check if there were any file validation errors
    if (req.fileValidationError) {
        req.flash('error', req.fileValidationError);
        return res.redirect('upload-course'); // Redirect to your course creation form
    }

    // Extract courses data from the request body
    const coursesData = req.body
    const course_cnt = Number(req.body.course_cnt);
    const files = req.files
    console.log("FILE DATA")
    console.log(files)
    console.log("COURSE DATA")
    console.log(course_cnt)
    console.log(coursesData)
    // Create an array to store promises of course creation
    const createCoursePromises = [];
    for(let i=0; i<course_cnt; i++){
        console.log(i)
        const newCourse = await new COURSE_DB({
            course_title: coursesData['course-name'][i],
            course_summary: coursesData['course-summary'][i],
            course_synopsis: coursesData['course-synopsis'][i].split(',').map(item => item.trim()),
            course_description: coursesData['course-description'][i],
            course_duration: coursesData['course-duration'][i],
            course_price: coursesData['course-price'][i],
            course_tags: coursesData['course-tags'] ? coursesData['course-tags'][i].split(',').map(tag => tag.trim()) : [],
            course_image: files[i].filename
        })
        console.log("done one")
        createCoursePromises.push(newCourse.save());

    }
    // Execute all promises and handle responses
    Promise.all(createCoursePromises)
        .then(courses => {
            res.json({ courses });
            res.redirect('upload-course')
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });

    }

const getAllCourse = async (req, res) =>{
    try {
        const courses = await COURSE_DB.find();
        res.render('templates/admin/show_courses', { courses: courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// Function to view a course
const viewCourse = async function(req, res, next) {
    try {
        const course = await COURSE_DB.findById(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.render('templates/admin/view_course', { course: course });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to edit a course
const editCourse = async function(req, res) {
    try {
        const course = await COURSE_DB.findById(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.render('templates/admin/edit_course', { course: course });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

const updateCourse = async (req, res)=>{
        // Check if there were any file validation errors
        if (req.fileValidationError) {
            req.flash('error', req.fileValidationError);
            return res.redirect('upload-course'); // Redirect to your course creation form
        }
        const updatedData = {
            course_title: req.body.course_title,
            course_summary: req.body.course_summary,
            course_description: req.body.course_description,
            course_synopsis: req.body.course_synopsis.split(',').map(item => item.trim()),
            course_duration: req.body.course_duration,
            course_price: req.body.course_price,
            course_tags: req.body.course_tags.split(',').map(item => item.trim()),
        };

        if (req.file) {
            updatedData.course_image = req.file.filename;
        }

        try {
            const course = await COURSE_DB.findByIdAndUpdate(req.params.id, updatedData, { new: true });
            if (!course) {
                return res.status(404).send('Course not found');
            }

            res.redirect('/admin-panel/course/view/'+req.params.id);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
}


// Function to delete a course
const deleteCourse = async function(req, res) {
    try {
        const course = await COURSE_DB.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        // Delete the course image from the uploads folder
        if (course.course_image) {
            const filePath = path.join(__dirname, '../uploads', course.course_image);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Failed to delete image file:', err);
                }
            });
        }

        res.redirect('/admin-panel/courses');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};





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
    uploadCourse,
    getAllCourse,
    viewCourse,
    editCourse,
    updateCourse,
    deleteCourse,
    getEmails,
    deleteEmail,
    createEmail,
}