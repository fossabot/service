import { prisma } from '../models/prisma-client';

function getUsers() {
  return prisma.users();
}

function getUser(id) {
  return prisma.user({ id });
}

function createUser(data) {
  const { avatar, ...otherData } = data;
  return prisma.createUser({
    ...otherData,
    avatar: avatar
      ? {
          connect: {
            id: avatar,
          },
        }
      : {},
  });
}

async function updateUser(id, data) {
  const { avatar = {}, ...otherData } = data;
  const { newImage, deleteImage } = avatar;
  await prisma.deleteImage({ id: deleteImage });
  return prisma.updateUser({
    where: { id },
    data: {
      ...otherData,
      avatar: newImage
        ? {
            connect: {
              id: newImage,
            },
          }
        : {},
    },
  });
}

function deleteUser(id) {
  return prisma.deleteUser({ id });
}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
