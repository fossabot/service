import service from '../services/post.service';

function list(req) {
  return service.getMultiList(req.query);
}

function create(req) {
  return service.createPost({
    ...req.body,
    account: req.user.id,
  });
}

export default { list, create };
