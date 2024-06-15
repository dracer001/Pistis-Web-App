const Student = require('../models/registration');
const Course = require('../models/course');

// Function to get all students
const getAllStudent = async(req, res, next) =>{
    try {
        const students = await Student.find().populate('course_id');
        res.render('studentList', { students: students });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// Function to create a new student
const createStudent = async (req, res) => {
    try {
        const { name, email, course_id } = req.body;

        // Check if the email already exists
        // Student can have more than one course registered to It's email
        const existingStudent = await Student.findOne({ email: email });
        // if (existingStudent) {
        //     req.flash('error_msg', 'Student with this email already exists');
        //     return res.redirect('/students/all');
        // }

        const student = new Student({
            name: name,
            email: email,
            course_id: course_id
        });
        await student.save();

        req.flash('success_msg', 'Student created successfully');
        res.redirect('/students/all');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

// Function to show the student form for editing a student
// const show_edit_student_form = async function(req, res, next) {
//     try {
//         const student = await Student.findById(req.params.id).populate('course_id');
//         if (!student) {
//             return res.status(404).send('Student not found');
//         }

//         const courses = await Course.find();
//         res.render('editStudent', { student: student, courses: courses });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };

// Function to update a student

// const update_stdent = async (req, res, next) =>{
//     try {
//         const { name, email, course_id } = req.body;

//         const updatedData = {
//             name: name,
//             email: email,
//             course_id: course_id
//         };

        // const student = await Student.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//         if (!student) {
//             return res.status(404).send('Student not found');
//         }

//         req.flash('success_msg', 'Student updated successfully');
//         res.redirect('/students/all');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };


// Function to delete a student
const deleteStudent = async function(req, res, next) {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        req.flash('success_msg', 'Student deleted successfully');
        res.redirect('/students/all');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
module.exports = {
    getAllStudent,
    deleteStudent,
    createStudent
}
