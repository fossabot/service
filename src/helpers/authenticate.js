import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
import { prisma } from '../models/prisma-client';
import config from '../config';
import { accountStatus } from '../config/constants';

export default async function authenticate(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    throw Boom.unauthorized('No token provided');
  }
  const { secretKey } = config.jwt;
  try {
    const decoded = jwt.verify(token, secretKey);
    const account = await prisma.account({ id: decoded.id });
    if (!account) {
      throw Boom.unauthorized('Access token is expired');
    }
    if (account.status === accountStatus.deactive) {
      throw Boom.notFound('account is deactive');
    }
    req.user = decoded;
  } catch (err) {
    throw Boom.unauthorized('Invalid access token');
  }
  next();
}
