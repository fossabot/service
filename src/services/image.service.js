import request from '../helpers/request';
import config from '../config';

function uploadSingleImage(data) {
  return request('/api/image/upload-single', {
    method: 'POST',
    headers: {
      ...data.getHeaders(),
      cloud_name: config.imageService.cloudName,
      api_key: config.imageService.apiKey,
      api_secret: config.imageService.apiSecret,
    },
    data,
  });
}

function uploadMultiImage(data) {
  return request('/api/image/upload-multi', {
    method: 'POST',
    headers: {
      ...data.getHeaders(),
      cloud_name: config.imageService.cloudName,
      api_key: config.imageService.apiKey,
      api_secret: config.imageService.apiSecret,
    },
    data,
  });
}

export { uploadSingleImage, uploadMultiImage };
