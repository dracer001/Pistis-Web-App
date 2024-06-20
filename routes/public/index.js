const express = require('express');
const router = express.Router();
const PUBLIC = require('../../controller/public')
const newsLetter = require('../../controller/newsLetterController')


router.get('/', PUBLIC.index)

router.get('/energy-solution', PUBLIC.esHome)

router.get('/it-solution', PUBLIC.itHome)

router.post('/add-newsLetter', newsLetter.createEmail)
module.exports = router;