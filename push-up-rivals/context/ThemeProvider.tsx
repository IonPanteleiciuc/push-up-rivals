"use client";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { red, blue } from "@mui/material/colors";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: { main: blue[700] },
		secondary: { main: blue[200] },
	},
});

const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: blue,
		secondary: red,
	},
});

export default function ThemeProviderMUI({
	children,
}: {
	children: ReactNode;
}) {
	//  TODO
	// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const prefersDarkMode = true;

	return (
		<ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
