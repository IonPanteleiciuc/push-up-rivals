"use client";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default async function SignOutButton() {
	const signOutHandler = async () => {
		await signOut({ callbackUrl: "/sign-in" });
	};

	return (
		<Button variant="outlined" onClick={signOutHandler}>
			Sign out
		</Button>
	);
}
