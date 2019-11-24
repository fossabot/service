import service from '../services/post.service';

function create() {
  return service.createPost();
}

export default { create };
