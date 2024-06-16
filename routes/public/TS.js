const express = require('express');

const router = express.Router();

const TS = require('../../controller/TS_Controller')

const emailController = require('../../controller/adminController')

// const checkpath = async(req, res, next)=>{
//     console.log(req.url);
//     next()
// }

router.get('/', TS.index)

// router.post('/add-email', checkpath, emailController.createEmail)


module.exports = router;
