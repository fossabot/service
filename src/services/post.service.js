import fs from 'fs';
// import { thinid } from 'thinid';
import FormData from 'form-data';
// import { prisma } from '../models/prisma-client';
import { uploadMultiImage } from './image.service';

async function createPost(files) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append(
      'images',
      fs.createReadStream(`${__dirname}/../../${file.path}`),
      file.originalname,
    );
  });
  const result = await uploadMultiImage(formData);
  // console.log(result.data, '...........result');
  return 'done';
}

export { createPost };
