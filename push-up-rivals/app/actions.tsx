"use server";

import { PrismaClient, User, Day } from "@prisma/client";
// import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (formData: FormData): Promise<User> => {
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (password !== confirmPassword) {
		throw new Error("Password don't match");
	}

	// const hash: string = await hashData(password);

	const user: User = await prisma.user.create({
		data: {
			email: formData.get("email") as string,
			firstname: formData.get("firstname") as string,
			name: formData.get("name") as string,
			password: password,
		},
	});

	return user;
};

const createToday = async (userId: string): Day => {
	await prisma.day.create({
		data: {
			userId,
		},
	});
};

// const hashData = (data: string): Promise<string> => {
// 	return bcrypt.hash(data, 42);
// };
