import service from '../services/tag.service';

function list(req) {
  return service.getTagList(req.query.title);
}

function create(req) {
  return service.createTag(req.body);
}

function update(req) {
  return service.updateTag({ ...req.body, id: req.params.id });
}

function destroy(req) {
  return service.deleteTag(req.params.id);
}

export default {
  list,
  create,
  update,
  destroy,
};
