"use server";

import { User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismaClient";

const schema = z.object({
	email: z.string().email().min(1),
	firstname: z.string().min(1).max(20),
	name: z.string().min(1).max(20),
	password: z
		.string()
		.min(8)
		.regex(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*,.()_-])(?!.*\s).+$/
		),
	confirmPassword: z
		.string()
		.min(8)
		.regex(
			/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*,.()_-])(?!.*\s).+$/
		),
});

type SignUpForm = {
	name: string;
	firstname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export const createUser = async (
	data: SignUpForm
): Promise<User | undefined> => {
	const validatedData = schema.parse({
		name: data.name,
		firstname: data.firstname,
		email: data.email,
		password: data.password,
		confirmPassword: data.confirmPassword,
	});

	if (validatedData.password !== validatedData.confirmPassword) {
		throw new Error("Password don't match");
	}

	const hash = await hashData(validatedData.password);

	const user: User = await prisma.user.create({
		data: {
			email: validatedData.email,
			firstname: validatedData.firstname,
			name: validatedData.name,
			password: hash,
		},
	});

	if (user) {
		createToday(user.id);
		return user;
	}

	return;
};

export const checkIfEmailIsAlreadyUsed = async (
	email: string
): Promise<boolean> => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		return !!user;
	} catch (error) {
		return false;
	}
};

const createToday = async (userId: string): Promise<void> => {
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
