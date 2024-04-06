import ResponsiveAppBar from "@/components/AppBar";
import SignOutButton from "@/components/SignOutButton";
import { requireActiveSession } from "@/lib/helperFunctions";
import { Box, Container, Typography } from "@mui/material";
import { Session } from "next-auth";
import prisma from "@/lib/prismaClient";

export default async function Home() {
	const session: Session = await requireActiveSession();

	if (!session) {
		return;
	}

	const connectedUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
		},
	});

	if (!connectedUser) {
		return;
	}

	return (
		<>
			<ResponsiveAppBar
				userInitials={
					connectedUser?.firstname[0] + connectedUser?.name[0]
				}
			/>
			<Container component="main">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography>
						This is the dashboard page of {connectedUser.name}
					</Typography>
				</Box>
			</Container>
		</>
	);
}
