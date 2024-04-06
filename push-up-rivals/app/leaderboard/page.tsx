import { requireActiveSession } from "@/lib/helperFunctions";
import { Box, Container, Typography } from "@mui/material";
import prisma from "@/lib/prismaClient";
import { Session } from "next-auth";
import ResponsiveAppBar from "@/components/AppBar";

export default async function LeaderboardPage() {
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
			<Container>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography>This is the leaderboard page.</Typography>
				</Box>
			</Container>
		</>
	);
}
