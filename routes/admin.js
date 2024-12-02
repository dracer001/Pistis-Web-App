const express = require('express');
const router = express.Router()
const adminController = require('../controller/adminController')
const upload = require('../middleware/uploadImage')


router.get('/', (req, res) => {
      return res.redirect('/dashboard');
    })

router.route('/login')
    .get(adminController.displayLogin)
    .post(adminController.authLogin)

router.get('/dashboard', adminController.adminIndex)

router.route('/upload-gallary')
    .get(adminController.uploadGallaryForm)
    .post(upload.single('gallary_image'), adminController.addGallary)


// // Routes for viewing and editing a course
// router.get('/course/view/:id', adminController.viewCourse);
// router.route('/course/edit/:id')
//     .get(adminController.editCourse)
//     .post(upload.single('course_image'), adminController.updateCourse);

// router.post('/course/delete/:id', adminController.deleteCourse)

// // NEWS LETTERS
// router.get('/newsletter/all', adminController.getEmails)
// router.post('/newsletter/delete/:id', adminController.deleteEmail)

// // REGISTRATION
// router.get('/students/all', studentController.getAllStudent)
// router.post('/student/delete:id', studentController.deleteStudent)
module.exports = router;