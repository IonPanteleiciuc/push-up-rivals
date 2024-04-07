import { Box } from "@mui/material";

export default function LoadingWidget() {
	return (
		<Box
			sx={{
				display: "flex-column",
				height: "158px",
				userSelect: "none",
				cursor: "default",
				alignContent: "center",
				fontSize: "1.5rem",
				textAlign: "center",
				border: "solid 1px black",
				borderRadius: "5px",
				borderColor: "grey.800",
			}}
		>
			Loading...
		</Box>
	);
}
