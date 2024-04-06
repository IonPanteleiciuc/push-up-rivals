"use server";

import { User, Day } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismaClient";

const schema = z.object({
	email: z.string().email().min(1),
	firstname: z.string().min(1),
	name: z.string().min(1),
	password: z.string().min(1),
	confirmPassword: z.string().min(1),
});

export const createUser = async (formData: FormData): Promise<User> => {
	const email = formData.get("email") as string;
	const firstname = formData.get("firstName") as string;
	const name = formData.get("lastName") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	const validatedDate = schema.parse({
		email,
		firstname,
		name,
		password,
		confirmPassword,
	});

	if (password !== confirmPassword) {
		throw new Error("Password don't match");
	}

	const hash = await hashData(password);

	const user: User = await prisma.user.create({
		data: {
			email,
			firstname,
			name,
			password: hash,
		},
	});

	createToday(user.id);

	return user;
};

const createToday = async (userId: string): Day => {
	await prisma.day.create({
		data: {
			userId,
		},
	});
};

const hashData = (data: string): Promise<string> => {
	return bcrypt.hash(data, 10);
};

export const doPasswordMatch = async (dbHash: string, password: string) => {
	return await bcrypt.compare(password, dbHash);
};
