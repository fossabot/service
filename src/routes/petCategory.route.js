import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '../helpers/authorize';
import withController from '../helpers/withController';
import { role } from '../config/constants';
import controller from '../controllers/petCategory.controller';

const router = express.Router();

router.post(
  '/',
  authorize(role.free, role.premium),
  celebrate({
    body: {
      name: Joi.string().required(),
      desscription: Joi.string(),
      image: Joi.string().guid(),
    },
  }),
  withController(controller.create),
);

export default router;
