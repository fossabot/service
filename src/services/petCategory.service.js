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

function updatePetCategory(data) {
  const { id, ...otherData } = data;
  return prisma.updatePetCategory({ data: { ...otherData }, where: { id } });
}

function deletePetCategory(id) {
  return prisma.deletePetCategory({ id });
}

export default {
  getPetCategoryList,
  createPetCategory,
  updatePetCategory,
  deletePetCategory,
};
