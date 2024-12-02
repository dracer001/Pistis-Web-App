const multer = require('multer');
const path = require('path');
const fs = require('fs');

// File size limit (3MB in bytes, you mentioned 5MB but the variable is set for 3MB)
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

// Path to the upload directory
const uploadDir = path.join(__dirname, '..', 'static', 'media', 'uploads', 'gallary');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.originalname).toLowerCase();
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
    }
});

const fileFilter = function (req, file, cb) {
    // Check file type
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (!allowedMimes.includes(file.mimetype)) {
        req.fileValidationError = 'Only JPEG and PNG images are allowed';
        return cb(new Error('Only JPEG and PNG images are allowed'), false);
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        req.fileValidationError = 'File size limit exceeded (max 3MB)';
        return cb(new Error('File size limit exceeded (max 3MB)'), false);
    }

    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: MAX_FILE_SIZE }
});

module.exports = upload;
