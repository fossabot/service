import moment from 'moment';
import { prisma } from '../models/prisma-client';
import { postDueDate, categories } from '../config/constants';

function random(length) {
  return Math.floor(Math.random() * length);
}

function pickTwoItemsFromArray(array) {
  const firstIndex = random(array.length);
  let secondIndex = random(array.length);
  while (firstIndex === secondIndex) {
    secondIndex = random(array.length);
  }
  return [array[firstIndex], array[secondIndex]];
}

async function getPosts({ skip, first, orderBy = 'updatedAt_DESC', petCategoryId }) {
  const fragment = `
  fragment PostFullProps on Post {
    id
    title
    description
    location
    price
    dueDate
    pet {
      id
      category {
        id
        name
        description
        image {
          id
          publicId
          url
        }
      }
      info
    }
    likes
    settings
    status
    postImages {
      id
      image {
        id
        publicId
        url
      }
    }
    postTags {
      id
      tag {
        id
        title
        description
      }
    }
    postLikes {
      id
      like {
        id
        account {
          id
        }
      }
    }
    account {
      id
      username
      email
      role
      user {
        id
        name
        phoneNumber
        address
        bio
        dob
        avatar {
          id
          publicId
          url
        }
        settings
      }
    }
  }
  `;
  let where = {};
  if (petCategoryId) {
    where = {
      pet: {
        category: {
          id: petCategoryId,
        },
      },
    };
  }
  const standardPosts = await prisma
    .posts({
      where,
      orderBy,
      first,
      skip,
    })
    .$fragment(fragment);
  const formattedPosts = standardPosts.map(post => ({
    type: 'Post',
    data: {
      ...post,
    },
  }));
  return formattedPosts;
}

async function getPetCategories() {
  const fragment = `
  fragment PetCategoryFullProps on PetCategory {
    id
    name
    description
    image {
      id
      url
      publicId
    }
  }
  `;
  const petCategoryList = await prisma
    .petCategories({
      orderBy: 'updatedAt_DESC',
    })
    .$fragment(fragment);

  const formattedPetCategorys = pickTwoItemsFromArray(petCategoryList).map(category => ({
    type: category.name,
    data: {
      ...category,
    },
  }));
  return {
    type: 'Pet Category',
    data: [...formattedPetCategorys],
  };
}

async function pickOneList({ skip, first = 5, selectedIndex }) {
  switch (selectedIndex) {
    case 0:
      const trendingPosts = await getPosts({
        skip,
        first,
        orderBy: 'likes_DESC',
      });
      return {
        type: 'Trending',
        data: [...trendingPosts],
      };
    case 1:
      const popularityPosts = await getPosts({
        skip,
        first,
        orderBy: 'createdAt_ASC',
      });
      return {
        type: 'Popularity',
        data: [...popularityPosts],
      };
    case 2:
      const priceHightToLowPosts = await getPosts({
        skip,
        first,
        orderBy: 'price_DESC',
      });
      return {
        type: 'Price hight to low',
        data: [...priceHightToLowPosts],
      };
    case 3:
      const priceLowToHightPosts = await getPosts({
        skip,
        first,
        orderBy: 'price_ASC',
      });
      return {
        type: 'Price low to hight',
        data: [...priceLowToHightPosts],
      };
    default:
      const petCategories = await getPetCategories();
      return petCategories;
  }
}

async function getMultiList({ offset: skip = 0, limit: first = 10, category, petCategoryId }) {
  // Priority: pet category, category.

  // Check pet category exists.
  if (petCategoryId) {
    const postsByPetCategory = await getPosts({
      skip,
      first,
      petCategoryId,
    });
    return postsByPetCategory;
  }

  // Pick category.
  const selectedIndex = categories.indexOf(category);
  if (selectedIndex !== -1) {
    const specialList = await pickOneList({ skip, first, selectedIndex });
    return [specialList];
  }
  const standardPosts = await getPosts({
    skip,
    first,
  });
  const randomIndex = random(categories.length);
  const specialList = await pickOneList({ skip, selectedIndex: randomIndex });
  const specialListIndex = random(first);
  standardPosts.splice(specialListIndex, 0, specialList);
  return [...standardPosts];
}

function renderPostImagesSchema(images, account) {
  const createdImages = [];
  images.forEach(image => {
    createdImages.push({
      image: {
        connect: {
          id: image,
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
  const { account, pet, tags, images, category, ...otherData } = data;
  const dueDate = moment().add(postDueDate, 'months');
  return prisma.createPost({
    ...otherData,
    dueDate,
    pet: {
      create: {
        ...pet,
        category: {
          connect: {
            id: pet.category,
          },
        },
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

async function reactPost(data) {
  let postResult = {};
  const { id, accountId } = data;
  const postByAccount = await prisma.post({
    id,
  });
  const postLikesByAccount = await prisma.postLikes({
    where: {
      post: {
        id,
      },
      like: {
        account: {
          id: accountId,
        },
      },
    },
  });
  const doReacted = postLikesByAccount.length > 0;
  if (doReacted) {
    postResult = await prisma.updatePost({
      data: {
        likes: postByAccount.likes - 1,
      },
      where: {
        id,
      },
    });
    await prisma.deletePostLike({
      id: postLikesByAccount[0].id,
    });
  } else {
    postResult = await prisma.updatePost({
      data: {
        likes: postByAccount.likes + 1,
      },
      where: {
        id,
      },
    });
    await prisma.createPostLike({
      post: {
        connect: {
          id,
        },
      },
      like: {
        create: {
          account: {
            connect: {
              id: accountId,
            },
          },
        },
      },
    });
  }
  return { ...postResult, doReacted: !doReacted };
}

export default { createPost, getMultiList, reactPost };
