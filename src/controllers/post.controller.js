import service from '../services/post.service';

function create(req) {
  return service.createPost(req.files);
}

export default { create };
