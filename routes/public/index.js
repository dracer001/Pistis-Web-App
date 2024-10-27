const express = require('express');
const router = express.Router();
const PUBLIC = require('../../controller/public')
const sendEmail = require('../../controller/sendContactUsMail')
const newsLetter = require('../../controller/newsLetterController')


router.get('/', PUBLIC.index)

router.get('/energy-solution', PUBLIC.esHome)

router.get('/project-showcase', PUBLIC.projectsShowcase)
router.post('/send-mail', sendEmail.sendEmail)

router.get('/it-solution', PUBLIC.itHome)

router.post('/add-newsLetter', newsLetter.createEmail)
router.post('/checkNewsletter', newsLetter.checkEmail)

router.get('/send-mail', newsLetter.sendEmail)
module.exports = router;