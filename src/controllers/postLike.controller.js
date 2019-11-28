import service from '../services/postLike.service';

function reactPost(req) {
  const {
    user: { id: accountId },
    query: { postId },
  } = req;
  return service.reactPost({
    postId,
    accountId,
  });
}

export default {
  reactPost,
};
