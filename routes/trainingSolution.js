const express = require('express');
const router = express.Router();
const trainingSolution = require('../controller/trainingSolutionController')
const emailController = require('../controller/adminController')
const checkDB = require('../middleware/database')
const checkpath = async(req, res, next)=>{
    console.log(req.url);
    next()
}

router.get('/', trainingSolution.index)
module.exports = router;

router.post('/add-email', checkpath, emailController.createEmail)