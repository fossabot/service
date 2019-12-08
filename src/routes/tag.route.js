import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '@/helpers/authorize';
import withController from '@/helpers/withController';
import { role } from '@/config/constants';
import controller from '../controllers/tag.controller';

const router = express.Router();

router.get(
  '/',
  authorize(role.admin, role.free, role.premium),
  celebrate({
    params: Joi.object().keys({
      title: Joi.string().default(''),
    }),
  }),
  withController(controller.list),
);

router.post(
  '/',
  authorize(role.admin, role.free, role.premium),
  celebrate({
    body: {
      title: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  withController(controller.create),
);

router.put(
  '/:id',
  authorize(role.admin, role.free, role.premium),
  celebrate({
    params: {
      id: Joi.string()
        .guid()
        .required(),
    },
    body: {
      title: Joi.string(),
      description: Joi.string(),
    },
  }),
  withController(controller.update),
);

router.delete(
  '/:id',
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

export default router;
