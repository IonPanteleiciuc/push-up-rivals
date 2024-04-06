"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createUser } from "../app/actions";

export default function SignUpForm() {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log("data: ", data);
		createUser(data);
	};

	return (
		<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						id="firstName"
						name="firstName"
						label="First Name"
						autoComplete="given-name"
						fullWidth
						required
						autoFocus
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="lastName"
						name="lastName"
						label="Last Name"
						autoComplete="family-name"
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="email"
						name="email"
						label="Email Address"
						autoComplete="email"
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="password"
						name="password"
						label="Password"
						type="password"
						autoComplete="new-password"
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						label="Confirm password"
						type="password"
						autoComplete="new-password"
						fullWidth
						required
					/>
				</Grid>
			</Grid>
			<Button
				type="submit"
				variant="contained"
				fullWidth
				sx={{ mt: 3, mb: 2 }}
			>
				Sign Up
			</Button>
			<Grid container justifyContent="flex-end">
				<Grid item>
					<Link href="/sign-in" variant="body2">
						Already have an account? Sign in
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
