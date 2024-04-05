// import SignOutButton from "@/components/SignOutButton";
import { requireActiveSession } from "@/lib/helperFunctions";
import { Box, Container, Typography } from "@mui/material";
import { Session } from "next-auth";

export default async function Home() {
	// const session: Session = await requireActiveSession();

	return (
		<Container component="main">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Typography>Connected user</Typography>
				{/* <SignOutButton /> */}
			</Box>
		</Container>
	);
}
