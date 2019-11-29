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

function reactPost(req) {
  const {
    user: { id: accountId },
    params: { id },
  } = req;
  return service.reactPost({
    id,
    accountId,
  });
}

export default { list, create, reactPost };
