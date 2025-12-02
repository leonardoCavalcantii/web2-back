import { Request, Response } from "express";
import {
	registerService,
	loginService,
	getUsersService,
	getUserByIdService,
	updateUserService,
	deleteUserService,
} from "../services/userService";


// Registro de usuário
export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const user = await registerService(name, email, password);
		res.status(201).json(user);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};

// Login de usuário
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await loginService(email, password);
		res.json(user);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};


// Listar todos os usuários
export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await getUsersService();
		res.json(users);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};


// Buscar usuário por ID
export const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await getUserByIdService(Number(id));
		if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
		res.json(user);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};


// Atualizar usuário
export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, email, password } = req.body;
		const user = await updateUserService(Number(id), name, email, password);
		res.json(user);
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};


// Deletar usuário
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await deleteUserService(Number(id));
		res.status(204).send();
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
