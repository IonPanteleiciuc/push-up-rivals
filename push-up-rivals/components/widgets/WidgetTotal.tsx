import { getTotalPushups } from "@/app/actions/dashboardActions";
import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default async function WidgetTotal(props: { userId: string }) {
	const totalPushups = await getTotalPushups(props.userId, 7);

	return (
		<Paper variant="outlined">
			<Box
				sx={{
					m: 3,
					display: "flex-column",
					height: "108px",
				}}
			>
				<Typography
					sx={{
						mt: 1,
						cursor: "default",
					}}
				>
					Total push-ups
				</Typography>
				<Typography
					sx={{
						fontSize: "3rem",
						userSelect: "none",
						mb: -1.5,
						cursor: "default",
					}}
				>
					{totalPushups.totalPushups}
				</Typography>
				<Typography
					sx={{
						color: grey[500],
						cursor: "default",
					}}
				>
					+{totalPushups.evolution} over last 7 days
				</Typography>
			</Box>
		</Paper>
	);
}
