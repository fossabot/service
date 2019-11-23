import fs from 'fs';
import FormData from 'form-data';
// import { prisma } from '../models/prisma-client';
// import { uploadMultiImage } from './image.service';

async function createPost(files) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append(
      'images',
      fs.createReadStream(`${__dirname}/../../${file.path}`),
      file.originalname,
    );
  });
  // const result = await uploadMultiImage(formData);
  const promiseList = files.map(file => fs.unlinkSync(`${__dirname}/../../${file.path}`));
  await Promise.all(promiseList);
  // console.log(result.data, '...........result');
  return 'done';
}

export default { createPost };
