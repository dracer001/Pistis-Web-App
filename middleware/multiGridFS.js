const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage'); // Use destructuring import here
const mongoose = require('mongoose');
const { mongoURI } = require('../models/modelConfig'); // Your DB URI

let gfs;

// Ensure GridFS is initialized correctly
const initializeGridFS = () => {
  if (mongoose.connection.readyState === 1) {  // MongoDB connection established
      gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);  // Correct initialization of GridFSBucket
      console.log('GridFS Initialized');
  } else {
      console.error('MongoDB not connected. Cannot initialize GridFS.');
  }
};

// Setup GridFsStorage for multer
const storage = new GridFsStorage({
    url: mongoURI,  // MongoDB URI
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileInfo = {
                filename: file.originalname,   // You can change this logic to generate filenames dynamically
                bucketName: 'uploads',         // Specify bucket name (this is your GridFS collection)
            };
            resolve(fileInfo);
        });
    },
});

const upload = multer({ storage });

module.exports = { upload, initializeGridFS };
