import { NextAuthOptions, RequestInternal, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { doPasswordMatch } from "@/app/actions/userActions";
import prisma from "@/lib/prismaClient";

type Credentials = {
	email: string;
	password: string;
};

export const options: NextAuthOptions = {
	providers: [
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

				if (
					dbUser &&
					(await doPasswordMatch(
						dbUser.password,
						credentials.password
					))
				) {
					const { id, email } = dbUser;
					return { id, email };
				}

				return null;
			},
		}),
	],
};
