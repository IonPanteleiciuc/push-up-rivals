"use client";
import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default async function WidgetAvg() {
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
					100
				</Typography>
				<Typography
					sx={{
						color: grey[500],
						cursor: "default",
					}}
				>
					+10 % from last 7 days
				</Typography>
			</Box>
		</Paper>
	);
}
