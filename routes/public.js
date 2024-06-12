const express = require('express');
const router = express.Router();
const PUBLIC = require('../controller/public')

router.get('/', PUBLIC.index)

module.exports = router;