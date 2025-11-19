import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router";
import Copyright from "@/components/Copyright";

export default function DefaultLayout() {
	return (
		<Container>
			<Outlet />
			<Box
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					width: "100%",
					textAlign: "center",
					p: 0,
				}}
			>
				<Copyright />
			</Box>
		</Container>
	);
}
