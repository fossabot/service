import { prisma } from '../models/prisma-client';

function renderPostImagesSchema(images, account) {
  const createdImages = [];
  images.forEach(image => {
    createdImages.push({
      image: {
        connect: {
          id: image.id,
        },
      },
      account: {
        connect: {
          id: account,
        },
      },
    });
  });
  return {
    create: [...createdImages],
  };
}

function renderPostTagsSchema(tags) {
  const createdTags = [];
  const connectedTags = [];
  tags.forEach(tag => {
    if (tag.id) {
      connectedTags.push({
        tag: {
          connect: {
            id: tag.id,
          },
        },
      });
    } else {
      createdTags.push({
        tag: {
          create: {
            title: tag.title,
            description: tag.description,
          },
        },
      });
    }
  });
  return {
    create: [...createdTags],
  };
}

function createPost(data) {
  const { account, pet, tags, images, ...otherData } = data;
  return prisma.createPost({
    ...otherData,
    pet: {
      create: {
        ...pet,
        account: {
          connect: {
            id: account,
          },
        },
      },
    },
    postImages: {
      ...renderPostImagesSchema(images, account),
    },
    postTags: {
      ...renderPostTagsSchema(tags),
    },
    account: {
      connect: {
        id: account,
      },
    },
  });
}

export default { createPost };
