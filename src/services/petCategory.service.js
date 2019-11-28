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
    image: image
      ? {
          connect: {
            id: image,
          },
        }
      : null,
  });
}

export default {
  getPetCategoryList,
  createPetCategory,
};
