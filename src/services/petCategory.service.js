import { prisma } from '../models/prisma-client';

function getPetCategoryList() {
  return prisma.petCategories({
    orderBy: 'createdAt_ASC',
  });
}

function createPetCategory(data) {
  const { image, ...otherData } = data;
  return prisma.createPetCategory({
    ...otherData,
    image: {
      connect: {
        id: image,
      },
    },
  });
}

export default {
  getPetCategoryList,
  createPetCategory,
};
