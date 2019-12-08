import { prisma } from '../models/prisma-client';

function getTagList(title = '') {
  return prisma.tags({
    where: {
      title_contains: title.toLowerCase(),
    },
    orderBy: 'title_ASC',
  });
}

function createTag(data) {
  return prisma.createTag(data);
}

function updateTag(data) {
  const { id, ...otherData } = data;
  return prisma.updateTag({ data: { ...otherData }, where: { id } });
}

function deleteTag(id) {
  return prisma.deleteTag({ id });
}

export default {
  getTagList,
  createTag,
  updateTag,
  deleteTag,
};
