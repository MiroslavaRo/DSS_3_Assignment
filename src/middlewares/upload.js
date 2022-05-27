const multer = require('multer')

const allowerExtension = ['.jpeg', '.jpg', '.png', '.bmp', '.raw', '.dng', '.riff', '.gif']

module.exports = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, callback) {
        const found = allowerExtension.filter(item => {
            return file.originalname.endsWith(item);
        });

        if (found.length <= 0) {
            return callback(new Error('The type of image is not supported'));
        }

        callback(undefined, true);
    }
});

