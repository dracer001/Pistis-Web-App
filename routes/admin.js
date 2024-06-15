const express = require('express');
const router = express.Router()
const adminController = require('../controller/adminController')
const studentController = require('../controller/registrationController')
const upload = require('../middleware/uploadImage')

router.route('/login')
    .get(adminController.displayLogin)
    .post(adminController.authLogin)

router.get('/dashboard', adminController.adminIndex)

router.route('/upload-course')
    .get(adminController.displayUpload)
    .post(upload.array('course-image'), adminController.uploadCourse)

router.get('/courses', adminController.getAllCourse)

// Routes for viewing and editing a course
router.get('/course/view/:id', adminController.viewCourse);
router.route('/course/edit/:id')
    .get(adminController.editCourse)
    .post(upload.single('course_image'), adminController.updateCourse);

router.post('/course/delete/:id', adminController.deleteCourse)

// NEWS LETTERS
router.get('/newsletter/all', adminController.getEmails)
router.post('/newsletter/delete/:id', adminController.deleteEmail)

// REGISTRATION
router.get('/students/all', studentController.getAllStudent)
router.post('/student/delete:id', studentController.deleteStudent)
module.exports = router;