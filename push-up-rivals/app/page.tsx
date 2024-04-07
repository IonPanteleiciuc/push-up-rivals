import ResponsiveAppBar from "@/components/AppBar";
import { requireActiveSession } from "@/lib/helperFunctions";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Session } from "next-auth";
import prisma from "@/lib/prismaClient";
import { createFromLastDayToToday } from "./actions/dayActions";
import RandomButton from "@/components/RandomButton";
import WidgetAvg from "@/components/widgets/WidgetAvg";

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

	await createFromLastDayToToday(connectedUser.id);

	return (
		<>
			<ResponsiveAppBar
				userInitials={
					connectedUser?.firstname[0] + connectedUser?.name[0]
				}
			/>
			<Container component="main" maxWidth="xl">
				This is the dashboard page of {connectedUser.name}
				<Grid
					container
					spacing={3}
					sx={{ mt: 1 }}
					alignItems="center"
					wrap="wrap"
				>
					<Grid item xs={12} md={6} lg={3}>
						<WidgetAvg userId={connectedUser.id} numberOfDays={7} />
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{/* <WidgetAvg /> */}
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{/* <WidgetAvg /> */}
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						{/* <WidgetAvg /> */}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
