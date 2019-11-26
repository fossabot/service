import service from '../services/petCategory.service';

function create(req) {
  return service.createPetCategory(req.body);
}

export default {
  create,
};
