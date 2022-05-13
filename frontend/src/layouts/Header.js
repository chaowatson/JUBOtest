import { Paper, Typography } from "@mui/material";

const Header = () => {
	return <Paper sx={{
		position: "static",
		paddingY: 2,
		backgroundColor: "lightblue",
		color: "white",
		borderRadius: 0
	}} elevation={5}>
		<Typography variant="h3" align="center">Patients And Orders</Typography>
	</Paper>
}

export default Header;