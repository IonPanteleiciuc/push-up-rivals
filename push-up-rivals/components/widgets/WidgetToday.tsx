import { getTodaysPushups } from "@/app/actions/dashboardActions";
import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default async function WidgetToday(props: { userId: string }) {
	const todaysPushups = await getTodaysPushups(props.userId);

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
					{todaysPushups}
				</Typography>
				<Typography
					sx={{
						color: grey[500],
						cursor: "default",
					}}
				>
					{100 - todaysPushups >= 0 ? 100 - todaysPushups : 0} more
				</Typography>
			</Box>
		</Paper>
	);
}
