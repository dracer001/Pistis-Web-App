const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference user
        ref: 'Course', // Assuming you have a User model
        required: true
    },
});

module.exports = mongoose.model('student', studentSchema);
