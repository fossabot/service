import { createPost } from '../services/post.service';

function create(req) {
  return createPost(req.files);
}

export { create };
