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

export default router;
