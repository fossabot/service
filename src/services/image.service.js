import request from '../helpers/request';
import config from '../config';

request.baseURL = config.imageService.domain;

function uploadSingleImage(image) {
  return request('/api/image/upload-single', {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
      cloud_name: config.imageService.cloudName,
      api_key: config.imageService.apiKey,
      api_secret: config.imageService.apiSecret,
    },
    data: {
      image,
    },
  });
}

function uploadMultiImage(images) {
  return request('http://localhost:8000/api/image/upload-multi', {
    method: 'POST',
    headers: {
      ...images.getHeaders(),
      cloud_name: config.imageService.cloudName,
      api_key: config.imageService.apiKey,
      api_secret: config.imageService.apiSecret,
    },
    data: images,
  });
}

export { uploadSingleImage, uploadMultiImage };
