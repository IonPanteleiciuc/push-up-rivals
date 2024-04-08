import ResponsiveAppBar from "@/components/AppBar";
import { requireActiveSession } from "@/lib/helperFunctions";
import { Container, Grid } from "@mui/material";
import { Session } from "next-auth";
import prisma from "@/lib/prismaClient";
import { createFromLastDayToToday } from "./actions/dayActions";
import WidgetAvg from "@/components/widgets/WidgetAvg";
import { Suspense } from "react";
import LoadingWidget from "@/components/widgets/LoadingWidget";
import WidgetTotal from "@/components/widgets/WidgetTotal";
import WidgetToday from "@/components/widgets/WidgetToday";
import WidgetAddPushups from "@/components/widgets/WidgetAddPushups";

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
				<Grid
					container
					spacing={3}
					sx={{ mt: 1 }}
					alignItems="center"
					wrap="wrap"
				>
					{/* Ok */}
					<Grid item xs={12} md={6} lg={3}>
						<Suspense fallback={<LoadingWidget />}>
							<WidgetTotal userId={connectedUser.id} />
						</Suspense>
					</Grid>

					{/* Ok */}
					<Grid item xs={12} md={6} lg={3}>
						<Suspense fallback={<LoadingWidget />}>
							<WidgetAvg userId={connectedUser.id} />
						</Suspense>
					</Grid>

					{/* Ok */}
					<Grid item xs={12} md={6} lg={3}>
						<Suspense fallback={<LoadingWidget />}>
							<WidgetToday userId={connectedUser.id} />
						</Suspense>
					</Grid>

					{/* not ok */}
					{/* <Grid item xs={12} md={6} lg={3}>
						<Suspense fallback={<LoadingWidget />}>
							<WidgetAddPushups userId={connectedUser.id} />
						</Suspense>
					</Grid> */}
				</Grid>
			</Container>
		</>
	);
}
