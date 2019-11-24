import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '../helpers/authorize';
import withController from '../helpers/withController';
import objectToArray from '../helpers/objectToArray';
import { role, postStatus, petType } from '../config/constants';
import controller from '../controllers/post.controller';

const router = express.Router();

router.post(
  '/',
  authorize(role.free, role.premium),
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string(),
      location: Joi.string().required(),
      dueDate: Joi.date().required(),
      settings: Joi.object(),
      status: Joi.string()
        .valid(objectToArray(postStatus))
        .default(postStatus.new),
      price: Joi.number().required(),
      images: Joi.array().items([
        Joi.object().keys({
          id: Joi.string().guid(),
        }),
      ]),
      pet: Joi.object()
        .keys({
          type: Joi.string().valid(objectToArray(petType)),
          info: Joi.object(),
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

export default router;
