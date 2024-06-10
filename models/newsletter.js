const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('newsLetter', emailSchema);
