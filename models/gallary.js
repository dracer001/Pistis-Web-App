const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallarySchema = new Schema({

    gallary_caption: {
        type: String,
        required: true
    },
    gallary_file_path: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('Gallary', gallarySchema);
