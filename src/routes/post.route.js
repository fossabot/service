import express from 'express';
import { celebrate, Joi } from 'celebrate';
import authorize from '@/helpers/authorize';
import upload from '../helpers/upload';
import withController from '../helpers/withController';
import { role } from '@/config/constants';
import { create } from '../controllers/post.controller';
import { maxImage } from '../config/constants';

const router = express.Router();

router.post('/', upload.array('images', maxImage), withController(create));

export default router;
