"use client";
import { createNdays } from "@/app/actions/dayActions";
import { Box, Button } from "@mui/material";

export default function RandomButton(props: { userId: string }) {
	const handleDayCreation = async () => {
		// await createNdays(props.userId, 60, new Date());
	};

	return (
		<Box sx={{ mt: 2 }}>
			<Button variant="outlined" onClick={handleDayCreation}>
				Create 10 days
			</Button>
		</Box>
	);
}
