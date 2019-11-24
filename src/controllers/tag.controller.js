import service from '../services/tag.service';

function list(req) {
  return service.getTagList(req.query.title);
}

export default {
  list,
};
