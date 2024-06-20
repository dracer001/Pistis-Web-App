const {
    viewCourse: courseViewAction,
    getAllCourse } = require('./courseController')

const {createStudent} = require('./studentController')
const index = (req, res)=>{
    return getAllCourse(req, res, 'public/TS/home')
    // res.render('public/TS/home', {course})
}

const viewCourse = async(req, res)=>{
    return courseViewAction(req, res, 'public/TS/course')
}

const studentReg = async(req, res)=>{
    return createStudent(req, res, req.originalUrl)
}
module.exports = {
    index,
    viewCourse,
    studentReg
}