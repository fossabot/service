import { prisma } from '../models/prisma-client';

function getTagList(title) {
  return prisma.tags({
    where: {
      title_contains: title,
    },
    orderBy: 'title_ASC',
  });
}

export default {
  getTagList,
};
