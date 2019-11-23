import multer from 'multer';
import path from 'path';
import Boom from '@hapi/boom';

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const acceptedExts = ['.png', '.jpg', '.jpeg', '.gif'];
    if (acceptedExts.indexOf(ext) === -1) {
      return callback(Boom.badRequest('Invalid image extension'));
    }
    callback(null, true);
  }
});

export default upload;
