import { prisma } from '../models/prisma-client';

async function reactPost(data) {
  let postResult = {};
  const { postId, accountId } = data;
  const postByAccount = await prisma.post({
    id: postId,
  });
  const postLikesByAccount = await prisma.postLikes({
    where: {
      post: {
        id: postId,
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
        id: postId,
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
        id: postId,
      },
    });
    await prisma.createPostLike({
      post: {
        connect: {
          id: postId,
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

export default {
  reactPost,
};
