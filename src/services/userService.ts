
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";



export const getUsersService = async () => {
	return prisma.user.findMany();
};

export const getUserByIdService = async (id: number) => {
	return prisma.user.findUnique({
		where: { id },
	});
};

export const updateUserService = async (id: number, name: string, email: string, password: string) => {
	return prisma.user.update({
		where: { id },
		data: { name, email, password },
	});
};

export const deleteUserService = async (id: number) => {
	return prisma.user.delete({
		where: { id },
	});
};


// Registro de usuário (criação com validação de e-mail e hash de senha)
export const registerService = async (name: string, email: string, password: string) => {
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) throw new Error("E-mail já cadastrado");
	const hashedPassword = await bcrypt.hash(password, 10);
	return prisma.user.create({
		data: { name, email, password: hashedPassword },
	});
};

// Login de usuário (verifica e-mail e senha)
export const loginService = async (email: string, password: string) => {
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw new Error("Usuário não encontrado");
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) throw new Error("Senha inválida");
	// Retorna o usuário sem a senha
	const { password: _, ...userWithoutPassword } = user;
	return userWithoutPassword;
};
