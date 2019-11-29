import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '../helpers/authorize';
import withController from '../helpers/withController';
import objectToArray from '../helpers/objectToArray';
import { role, postStatus, categories } from '../config/constants';
import controller from '../controllers/post.controller';

const router = express.Router();

router.get(
  '/',
  authorize(role.free, role.premium),
  celebrate({
    query: {
      offset: Joi.number()
        .integer()
        .min(0),
      limit: Joi.number()
        .integer()
        .min(0),
      category: Joi.string().valid(categories),
      petCategoryId: Joi.string().guid(),
    },
  }),
  withController(controller.list),
);

router.post(
  '/',
  authorize(role.free, role.premium),
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      location: Joi.string().required(),
      settings: Joi.object(),
      status: Joi.string()
        .valid(objectToArray(postStatus))
        .default(postStatus.new),
      price: Joi.number().required(),
      images: Joi.array().items([Joi.string().guid()]),
      pet: Joi.object()
        .keys({
          info: Joi.object(),
          category: Joi.string().guid(),
        })
        .required(),
      tags: Joi.array()
        .items([
          Joi.object().keys({
            id: Joi.string()
              .guid()
              .required(),
          }),
          Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string(),
          }),
        ])
        .optional(),
    }),
  }),
  withController(controller.create),
);

router.get(
  '/:id/react',
  authorize(role.free, role.premium),
  celebrate({
    params: {
      id: Joi.string()
        .guid()
        .required(),
    },
  }),
  withController(controller.reactPost),
);

export default router;
