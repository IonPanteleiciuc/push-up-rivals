"use client";
import { useDashboardData } from "@/context/DashboardDataProvider";
import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function WidgetAvg(props: { userId: string }) {
	const { avgPushups } = useDashboardData();

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
					Avg. push-ups /day
				</Typography>
				<Typography
					sx={{
						fontSize: "3rem",
						userSelect: "none",
						mb: -1.5,
						cursor: "default",
					}}
				>
					{avgPushups.lastNDaysAvg}
				</Typography>
				<Typography
					sx={{
						color: grey[500],
						cursor: "default",
					}}
				>
					{avgPushups.evolution > 0 ? "+" : ""}
					{avgPushups.evolution} % from last 7 days
				</Typography>
			</Box>
		</Paper>
	);
}
