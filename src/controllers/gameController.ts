import { Request, Response } from "express";
import {
  createGameService,
  getGamesService,
  getGameByIdService,
  updateGameService,
  deleteGameService,
} from "../services/gameService";

export const createGame = async (req: Request, res: Response) => {
  try {
    const { title, genre } = req.body;
    const game = await createGameService(title, genre);
    res.status(201).json(game);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await getGamesService();
    res.json(games);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await getGameByIdService(Number(id));
    if (!game) return res.status(404).json({ error: "Jogo não encontrado" });
    res.json(game);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, genre } = req.body;
    const game = await updateGameService(Number(id), title, genre);
    res.json(game);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteGameService(Number(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
