'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var prisma_lib_1 = require('prisma-client-lib');
var typeDefs = require('./prisma-schema').typeDefs;

var models = [
  {
    name: 'Role',
    embedded: false,
  },
  {
    name: 'AccountStatus',
    embedded: false,
  },
  {
    name: 'Account',
    embedded: false,
  },
  {
    name: 'User',
    embedded: false,
  },
  {
    name: 'PostStatus',
    embedded: false,
  },
  {
    name: 'Post',
    embedded: false,
  },
  {
    name: 'PetType',
    embedded: false,
  },
  {
    name: 'Pet',
    embedded: false,
  },
  {
    name: 'Tag',
    embedded: false,
  },
  {
    name: 'PostTag',
    embedded: false,
  },
  {
    name: 'Image',
    embedded: false,
  },
  {
    name: 'PostImage',
    embedded: false,
  },
  {
    name: 'CommentImage',
    embedded: false,
  },
  {
    name: 'ReviewImage',
    embedded: false,
  },
  {
    name: 'Comment',
    embedded: false,
  },
  {
    name: 'Review',
    embedded: false,
  },
  {
    name: 'Like',
    embedded: false,
  },
  {
    name: 'PostLike',
    embedded: false,
  },
  {
    name: 'CommentLike',
    embedded: false,
  },
  {
    name: 'ReviewLike',
    embedded: false,
  },
  {
    name: 'Report',
    embedded: false,
  },
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env['PRISMA_ENDPOINT']}`,
});
exports.prisma = new exports.Prisma();
