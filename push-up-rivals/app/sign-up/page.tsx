import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignUpForm from "@/components/SignUpForm";
import { disallowOnActiveSession } from "@/lib/helperFunctions";

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://ionpanteleiciuc.com/">
				Ion Panteleiciuc
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default async function SignUp() {
	await disallowOnActiveSession();

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<SignUpForm />
			</Box>
			<Copyright sx={{ mt: 5 }} />
		</Container>
	);
}
