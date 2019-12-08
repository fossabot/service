import express from 'express';
import { celebrate, Joi } from 'celebrate';
import withController from '../helpers/withController';
import authenticate from '../helpers/authenticate';
import authorize from '../helpers/authorize';
import controller from '../controllers/account.controller';
import objectToArray from '../helpers/objectToArray';
import { role, accountStatus } from '../config/constants';

const router = express.Router();
router.get(
  '/require-code',
  celebrate({
    query: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
    }),
  }),
  withController(controller.requireCode),
);

router.post(
  '/register',
  celebrate({
    query: Joi.object().keys({
      code: Joi.number().required(),
      email: Joi.string()
        .email()
        .required(),
    }),
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string()
        .valid(objectToArray(role))
        .default(role.free),
      user: Joi.object().keys({
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.object(),
        bio: Joi.string(),
        dob: Joi.date(),
        settings: Joi.object(),
        avatar: Joi.string().guid(),
      }),
      status: Joi.string()
        .valid(objectToArray(accountStatus))
        .default(accountStatus.active),
      settings: Joi.object(),
    }),
  }),
  withController(controller.register),
);

router.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  withController(controller.login),
);

router.get(
  '/',
  authenticate,
  authorize(role.admin, role.free, role.premium),
  celebrate({
    query: {
      offset: Joi.number()
        .integer()
        .min(0),
      limit: Joi.number()
        .integer()
        .min(0),
    },
  }),
  withController(controller.list),
);

// Update username, email, password.
router.put(
  '/:id',
  authenticate,
  authorize(role.admin, role.free, role.premium),
  celebrate({
    params: {
      id: Joi.string()
        .guid()
        .required(),
    },
    body: Joi.object().keys({
      username: Joi.string(),
      password: Joi.string(),
      newPassword: Joi.string(),
      email: Joi.string(),
    }),
  }),
  withController(controller.update),
);

router.put(
  '/:id/status',
  authenticate,
  authorize(role.admin, role.free, role.premium),
  celebrate({
    params: {
      id: Joi.string()
        .guid()
        .required(),
    },
    body: Joi.object().keys({
      status: Joi.string()
        .valid(objectToArray(accountStatus))
        .required(),
    }),
  }),
  withController(controller.updateStatus),
);

router.delete(
  '/:id',
  authenticate,
  authorize(role.admin, role.free, role.premium),
  celebrate({
    params: {
      id: Joi.string()
        .guid()
        .required(),
    },
  }),
  withController(controller.destroy),
);

router.get('/check-token', withController(controller.checkToken));

export default router;
