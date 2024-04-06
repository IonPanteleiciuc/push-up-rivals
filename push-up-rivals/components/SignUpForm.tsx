"use client";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { checkIfEmailIsAlreadyUsed, createUser } from "../app/actions";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
	const [name, setName] = useState("");
	const [firstname, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isNameValid, setIsNameValid] = useState(true);
	const [isFirstnameValid, setIsFirstnameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

	const [isEmaiAlreadyUsed, setIsEmaiAlreadyUsed] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [isSignedUp, setIsSignedUp] = useState(false);
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const params = {
				name,
				firstname,
				email,
				password,
				confirmPassword,
			};

			if (
				isNameValid &&
				isFirstnameValid &&
				isEmailValid &&
				isPasswordValid &&
				doPasswordsMatch
			) {
				createUser(params);
				loadingThenSuccessButton();
			}
		} catch (error) {
			console.error("error", error);
		}
	};

	const validateName = (name: string) => {
		if (name.length < 1 || name.length > 20) {
			setIsNameValid(false);
			return;
		}

		setIsNameValid(true);
	};

	const validateFirstname = (name: string) => {
		if (name.length < 1 || name.length > 20) {
			setIsFirstnameValid(false);
			return;
		}

		setIsFirstnameValid(true);
	};

	const validateEmail = async (email: string) => {
		// Check if email is valid
		const re = /\S+@\S+\.\S+/;

		if (!re.test(email)) {
			setIsEmailValid(false);
			return;
		}

		setIsEmailValid(true);

		if (await checkIfEmailIsAlreadyUsed(email)) {
			setIsEmaiAlreadyUsed(true);
			return;
		}

		setIsEmaiAlreadyUsed(false);
	};

	const validatePassword = (password: string) => {
		// At least 8 characters
		if (password.length < 8) {
			setIsPasswordValid(false);
			return;
		}

		// At least one uppercase letter
		if (!/[A-Z]/.test(password)) {
			setIsPasswordValid(false);
			return;
		}

		// At least one lowercase letter
		if (!/[a-z]/.test(password)) {
			setIsPasswordValid(false);
			return;
		}

		// At least one number
		if (!/[0-9]/.test(password)) {
			setIsPasswordValid(false);
			return;
		}

		// At least one special character among the following: !@#$%^&*,.()_-
		if (!/[!@#$%^&*,.()_-]/.test(password)) {
			setIsPasswordValid(false);
			return;
		}

		// if space character is found
		if (/\s/.test(password)) {
			setIsPasswordValid(false);
			return;
		}

		setIsPasswordValid(true);
		return;
	};

	const validateConfirmPassword = (
		password: string,
		confirmPassword: string
	) => {
		if (password !== confirmPassword) {
			setDoPasswordsMatch(false);
			return;
		}

		if (!isPasswordValid) {
			setDoPasswordsMatch(false);
			return;
		}

		setDoPasswordsMatch(true);
		return;
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (name === "lastName") {
			setName(value);
			validateName(value);
		}

		if (name === "firstName") {
			setFirstname(value);
			validateFirstname(value);
		}

		if (name === "email") {
			setEmail(value);
			validateEmail(value);
		}
		if (name === "password") {
			setPassword(value);
			validatePassword(value);
		}
		if (name === "confirmPassword") {
			setConfirmPassword(value);
			validateConfirmPassword(password, value);
		}
	};

	const loadingThenSuccessButton = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsSignedUp(true);
		}, Math.random() * 1000 + 1000);
	};

	return (
		<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						id="firstName"
						name="firstName"
						label="First Name"
						value={firstname}
						onChange={handleInputChange}
						autoComplete="given-name"
						fullWidth
						required
						autoFocus
						error={!isFirstnameValid}
						helperText={!isFirstnameValid ? "Required" : ""}
						disabled={isSignedUp}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="lastName"
						name="lastName"
						label="Last Name"
						value={name}
						onChange={handleInputChange}
						autoComplete="family-name"
						fullWidth
						required
						error={!isNameValid}
						helperText={!isNameValid ? "Required" : ""}
						disabled={isSignedUp}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="email"
						name="email"
						value={email}
						onChange={handleInputChange}
						label="Email Address"
						autoComplete="email"
						fullWidth
						required
						error={!isEmailValid || isEmaiAlreadyUsed}
						helperText={
							isEmaiAlreadyUsed
								? "Email already used"
								: !isEmailValid
								? "Invalid email"
								: ""
						}
						disabled={isSignedUp}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="password"
						name="password"
						label="Password"
						type="password"
						value={password}
						onChange={handleInputChange}
						autoComplete="new-password"
						fullWidth
						required
						error={!isPasswordValid}
						helperText={
							!isPasswordValid ? (
								<span>
									Password must contain at least: <br />
									- 8 characters <br />
									- 1 uppercase letter <br />
									- 1 lowercase letter <br />
									- 1 number <br />- 1 special character among
									: !@#$%^&*,.()_- <br />
								</span>
							) : (
								""
							)
						}
						disabled={isSignedUp}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						label="Confirm password"
						type="password"
						value={confirmPassword}
						onChange={handleInputChange}
						autoComplete="new-password"
						fullWidth
						required
						error={!doPasswordsMatch}
						helperText={
							!doPasswordsMatch ? "Passwords must match" : ""
						}
						disabled={isSignedUp}
					/>
				</Grid>
			</Grid>
			{isSignedUp ? (
				<Button
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					color="success"
					onClick={() => router.push("/sign-in")}
				>
					Account created ! Click to sign in
				</Button>
			) : (
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					{isLoading ? "Loading..." : "Sign Up"}
				</Button>
			)}
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
