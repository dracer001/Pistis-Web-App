const express = require('express');
const router = express.Router()
const adminController = require('../controller/adminController')

router.route('/login')
    .get(adminController.displayLogin)
    .post(adminController.authLogin)

router.get('/dashboard', adminController.adminIndex)

router.route('/upload-course')
    .get(adminController.displayUpload)
    .post(adminController.uploadCourse)

module.exports = router;