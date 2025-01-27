import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

// Create uploads directory if it doesn't exist
const uploadDirectory = './uploads';
if (!existsSync(uploadDirectory)) {
  mkdirSync(uploadDirectory);
}

export const multerConfig: MulterOptions = {
  dest: uploadDirectory,
  
  fileFilter: (req, file, callback) => {
    // Check file extension
    const allowedExtensions = /\.(jpg|jpeg|png|pdf)$/;
    if (!file.originalname.toLowerCase().match(allowedExtensions)) {
      return callback(
        new HttpException(
          'Only .jpg, .jpeg, .png, and .pdf files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
    callback(null, true);
  },

  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
}; 