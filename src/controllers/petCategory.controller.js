import service from '../services/petCategory.service';

function list() {
  return service.getPetCategoryList();
}

function create(req) {
  return service.createPetCategory(req.body);
}

function update(req) {
  return service.updatePetCategory({ ...req.body, id: req.params.id });
}

function destroy(req) {
  return service.deletePetCategory(req.params.id);
}

export default {
  list,
  create,
  update,
  destroy,
};
