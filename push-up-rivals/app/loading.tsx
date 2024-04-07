import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

export default function CircularIndeterminate() {
	return (
		<Grid
			container
			sx={{
				display: "flex",
				width: "100vw",
				height: "100vh",
				justifyContent: "center",
				alignContent: "center",
			}}
		>
			<Grid
				item
				lg={1}
				sx={{
					display: "grid",
					justifyContent: "center",
				}}
			>
				<CircularProgress color="primary" size={75} />
			</Grid>
		</Grid>
	);
}
