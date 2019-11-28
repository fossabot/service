import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '../helpers/authorize';
import withController from '../helpers/withController';
import { role } from '../config/constants';
import controller from '../controllers/postLike.controller';

const router = express.Router();

router.get(
  '/react',
  authorize(role.free, role.premium),
  celebrate({
    query: {
      postId: Joi.string()
        .guid()
        .required(),
    },
  }),
  withController(controller.reactPost),
);

export default router;
