import { prisma } from "../prisma";

export const createGameService = async (title: string, genre?: string) => {
  return prisma.game.create({
    data: { title, genre },
  });
};

export const getGamesService = async () => {
  return prisma.game.findMany();
};

export const getGameByIdService = async (id: number) => {
  return prisma.game.findUnique({
    where: { id },
  });
};

export const updateGameService = async (id: number, title: string, genre?: string) => {
  return prisma.game.update({
    where: { id },
    data: { title, genre },
  });
};

export const deleteGameService = async (id: number) => {
  return prisma.game.delete({
    where: { id },
  });
};
