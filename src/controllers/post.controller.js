import service from '../services/post.service';

function create(req) {
  return service.createPost({
    ...req.body,
    account: req.user.id,
  });
}

export default { create };
