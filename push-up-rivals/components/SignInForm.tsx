"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCallbackUrl } from "@/lib/helperFunctions";

export default function SignInForm() {
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const response = await signIn("credentials", {
			redirect: false,
			email: data.get("email"),
			password: data.get("password"),
		});

		if (!response) {
			return;
		}

		if (response.status === 401) {
			console.log("Handle error !");
			return;
		}

		const callbackUrl = getCallbackUrl(response.url);
		router.push(callbackUrl);
	};

	return (
		<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
			<TextField
				id="email"
				name="email"
				label="Email Address"
				autoComplete="email"
				margin="normal"
				autoFocus
				fullWidth
				required
			/>
			<TextField
				id="password"
				name="password"
				label="Password"
				type="password"
				autoComplete="current-password"
				margin="normal"
				fullWidth
				required
			/>
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				type="submit"
				variant="contained"
				fullWidth
				sx={{ mt: 3, mb: 2 }}
			>
				Sign In
			</Button>
			<Grid container>
				<Grid item xs>
					<Link href="#" variant="body2">
						Forgot password?
					</Link>
				</Grid>
				<Grid item>
					<Link href="/sign-up" variant="body2">
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
