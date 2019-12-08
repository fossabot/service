import service from '../services/account.service';

function requireCode(req) {
  const {
    query,
    app: {
      locals: { redis },
    },
  } = req;
  return service.requireCode(redis, query);
}

function register(req) {
  const {
    query,
    body,
    app: {
      locals: { redis },
    },
  } = req;
  return service.register(redis, query, body);
}

function login(req) {
  return service.login(req.body);
}

function list(req) {
  return service.getAccountList({
    ...req.query,
  });
}

function update(req) {
  return service.updateAccount({
    ...req.body,
    id: req.params.id,
  });
}

function updateStatus(req) {
  return service.updateAccountStatus({
    id: req.params.id,
    status: req.body.status,
  });
}

function destroy(req) {
  return service.deleteAccount(req.params.id);
}

function checkToken(req) {
  return service.checkToken(req.headers);
}

export default {
  requireCode,
  register,
  login,
  list,
  update,
  updateStatus,
  destroy,
  checkToken,
};
