import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import "./globals.css";
import ThemeProviderMUI from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Push up Rivals",
	description: "Challenge your friends to a push up competition !",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<ThemeProviderMUI>{children}</ThemeProviderMUI>
				</AuthProvider>
			</body>
		</html>
	);
}
