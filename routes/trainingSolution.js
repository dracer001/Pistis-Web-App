const express = require('express');
const router = express.Router();
const trainingSolution = require('../controller/trainingSolutionController')
const checkDB = require('../middleware/database')


router.get('/', trainingSolution.index)
module.exports = router;