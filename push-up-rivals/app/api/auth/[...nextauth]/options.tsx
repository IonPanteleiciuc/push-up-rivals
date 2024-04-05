import { NextAuthOptions, RequestInternal, getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
// import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

type Credentials = {
	email: string;
	password: string;
};

export const options: NextAuthOptions = {
	providers: [
		// Crediential providers
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "email",
					type: "email",
					placeholder: "example@example.com",
				},
				password: { label: "Password", type: "password" },
			},

			async authorize(
				credentials: Credentials | undefined,
				req: Pick<
					RequestInternal,
					"query" | "body" | "headers" | "method"
				>
			) {
				if (
					!credentials ||
					!credentials.email ||
					!credentials.password
				) {
					return null;
				}

				const dbUser = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (dbUser && credentials.password === dbUser.password) {
					const { id, email } = dbUser;
					return { id, email };
				}

				return null;
			},
		}),
	],
};

// const doPasswordMatch = async (dbHash: string, password: string) => {
// 	return await bcrypt.compare(password, dbHash);
// };
