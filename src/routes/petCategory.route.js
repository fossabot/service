import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '../helpers/authorize';
import withController from '../helpers/withController';
import { role } from '../config/constants';
import controller from '../controllers/petCategory.controller';

const router = express.Router();

router.get('/', authorize(role.admin, role.free, role.premium), withController(controller.list));

router.post(
  '/',
  authorize(role.admin, role.free, role.premium),
  celebrate({
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      image: Joi.string().guid(),
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
      name: Joi.string().required(),
      description: Joi.string(),
      image: Joi.string().guid(),
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
