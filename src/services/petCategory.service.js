import { prisma } from '../models/prisma-client';

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
  createPetCategory,
};
