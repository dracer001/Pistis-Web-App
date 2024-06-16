const express = require('express');
const router = express.Router();
const PUBLIC = require('../../controller/public')


router.get('/', PUBLIC.index)

router.get('/energy-solution', PUBLIC.esHome)

router.get('/it-solution', PUBLIC.itHome)


module.exports = router;