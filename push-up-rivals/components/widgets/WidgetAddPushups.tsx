"use client";
import { addPushups } from "@/app/actions/dayActions";
import { useDashboardData } from "@/context/DashboardDataProvider";
import {
	Paper,
	Box,
	OutlinedInput,
	InputAdornment,
	FormControl,
	Typography,
	Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function WidgetAddPushups(props: { userId: string }) {
	const [input, setInput] = useState("");
	const { fetchData } = useDashboardData();

	useEffect(() => {
		fetchData(props.userId, 7);
	});

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const value = event.currentTarget.value;

		const regex = /^-?\d*$/;
		if (regex.test(value)) {
			setInput(value);
			fetchData(props.userId, 7);
		}
	};

	const handleSubmit = async () => {
		await addPushups(props.userId, Number(input));
		setInput("");
	};
	return (
		<Paper variant="outlined">
			<Box
				sx={{
					m: 3,
					display: "flex-column",
					justifyContent: "center",
					height: "108px",
				}}
			>
				<Typography>Add Push ups</Typography>
				<Box
					sx={{
						mt: 3,
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "flex-start",
					}}
				>
					<FormControl
						sx={{
							width: "25ch",
							mr: 3,
						}}
						variant="outlined"
						size="small"
					>
						<OutlinedInput
							id="outlined-adornment-weight"
							endAdornment={
								<InputAdornment position="end">
									push ups
								</InputAdornment>
							}
							aria-describedby="outlined-weight-helper-text"
							inputProps={{
								"aria-label": "weight",
							}}
							value={input}
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => {
								handleInput(event);
							}}
						/>
					</FormControl>
					<Button variant="contained" onClick={handleSubmit}>
						{"+"}
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
