import { prisma } from "../prisma";

export const createPostService = async (userId: number, gameId: number, content: string, rating: number) => {
  return prisma.post.create({
    data: { userId, gameId, content, rating },
  });
};

export const getPostsService = async () => {
  return prisma.post.findMany({
    include: {
      user: { select: { id: true, name: true } },
      game: { select: { id: true, title: true } },
    },
  });
};

export const getPostByIdService = async (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true } },
      game: { select: { id: true, title: true } },
    },
  });
};

export const updatePostService = async (id: number, content: string, rating: number) => {
  return prisma.post.update({
    where: { id },
    data: { content, rating },
  });
};

export const deletePostService = async (id: number) => {
  return prisma.post.delete({
    where: { id },
  });
};
