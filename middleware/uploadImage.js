// const multer  = require('multer')


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
//       },
//   })

//   const fileFilter = (req, file, cb) => {
//     const allowedMimeTypes = ['image/jpeg', 'image/png'];
//     allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
//   }

// const upload = multer({ storage: storage,
//      fileFilter,
//      limits: {
//         fileSize: 1024*1024*5
//      } 
//     })

// module.exports = {
//     upload, 
//     multer
// }


const multer = require('multer');
const path = require('path');

// File size limit (5MB)
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 5MB in bytes

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const fileFilter = function(req, file, cb) {
    // Check file type
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (!allowedMimes.includes(file.mimetype)) {
        req.fileValidationError = 'Only JPEG and PNG images are allowed';
        return cb(null, false, new Error('Only JPEG and PNG images are allowed'));
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        req.fileValidationError = 'File size limit exceeded (max 5MB)';
        return cb(null, false, new Error('File size limit exceeded (max 5MB)'));
    }

    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
