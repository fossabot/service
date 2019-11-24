import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '@/helpers/authorize';
import withController from '@/helpers/withController';
import { role } from '@/config/constants';
import controller from '@/controllers/user.controller';

const router = express.Router();

router.get('/', authorize(role.free, role.premium), withController(controller.list));

router.get(
  '/:id',
  authorize(role.free, role.premium),
  celebrate({
    params: Joi.object().keys({
      id: Joi.string()
        .guid()
        .required(),
    }),
  }),
  withController(controller.retrieve),
);

router.post(
  '/',
  authorize(role.free, role.premium),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      address: Joi.object(),
      bio: Joi.string(),
      dob: Joi.string().isoDate(),
      settings: Joi.object(),
      avatar: Joi.string()
    }),
  }),
  withController(controller.create),
);

router.put(
  '/:id',
  authorize(role.free, role.premium),
  celebrate({
    params: Joi.object().keys({
      id: Joi.string()
        .guid()
        .required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      address: Joi.object(),
      bio: Joi.string(),
      dob: Joi.string().isoDate(),
      settings: Joi.object(),
      avatar: Joi.string()
    }),
  }),
  withController(controller.update),
);

router.delete(
  '/:id',
  authorize(role.free, role.premium),
  celebrate({
    params: Joi.object().keys({
      id: Joi.string()
        .guid()
        .required(),
    }),
  }),
  withController(controller.destroy),
);

export default router;
