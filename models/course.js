const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    course_title: {
        type: String,
        required: true,
        unique: true
    },
    course_summary: {
        type: String,
        required: true
    },
    course_description: {
        type: String,
        required: true,
    },
    course_synopsis: {
        type: [String],
        required: true
    },
    course_duration: {
        type: String
    },
    course_price: {
        type: Number,
        required: true
    },
    course_tags: {
        type: [String],
    },
});

module.exports = mongoose.model('Course', courseSchema);
