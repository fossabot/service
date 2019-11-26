import service from '../services/petCategory.service';

function list() {
  return service.getPetCategoryList();
}

function create(req) {
  return service.createPetCategory(req.body);
}

export default {
  list,
  create,
};
