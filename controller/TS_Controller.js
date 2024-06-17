const {
    viewCourse: courseViewAction,
    getAllCourse } = require('./courseController')

const index = (req, res)=>{
    return getAllCourse(req, res, 'public/TS/home')
    // res.render('public/TS/home', {course})
}

const viewCourse = async(req, res)=>{
    return courseViewAction(req, res, 'public/TS/course')
}
module.exports = {
    index,
    viewCourse
}