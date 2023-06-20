import { Container, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { UseGlobalContext } from "../GlobalContext";

export default function Hourly() {
	const { hourly } = UseGlobalContext();

	const containerStyle = {
		maxW: "5xl",
		backgroundColor: "white",
		position: "fixed",
		top: "38vh",
		left: "0px",
		bottom: "5vh",
		right: "0px",
		borderRadius: "lg",
		padding: "0",
		overflow: "scroll"
	};

	const tableHeadStyle = {
		height: "40px",
		backgroundColor: 'black',
	};

	const labelStyle = {
		fontWeight: "bold",
		position: 'sticky'
	};

	const itemStyle = {
		backgroundColor: 'gray.100',
		color: 'black',
		marginBottom: '8px',
		justifyContent: 'space-around',
		alignItems: 'center',
		fontSize: '18px',
		paddingRight: '20px',
		height: '40px'
	}

	return (
		<Container sx={containerStyle}>
			<TableContainer>
				<Table variant="striped">
					<Thead fixed sx={tableHeadStyle}>
						<Tr>
							<Th sx={labelStyle}>Hour</Th>
							<Th sx={labelStyle}>Temp</Th>
							<Th sx={labelStyle}>Feels Like</Th>
							<Th sx={labelStyle}>UV Index</Th>
							<Th sx={labelStyle}>Wind Speed</Th>
						</Tr>
					</Thead>
					<Tbody>
						{hourly
							? hourly.map((obj, index) => {
									let time = new Date(obj.dt * 1000);
									let hour = ("0" + time.getHours()).slice(-2);
									return (
										<Tr sx={itemStyle} key={index}>
											<Td fontWeight="bold">{hour}</Td>
											<Td>{Math.round(obj.temp)}&deg;</Td>
											<Td>{Math.round(obj.feels_like)}&deg;</Td>
											<Td>{Math.round(obj.uvi)}</Td>
											<Td>{Math.round(obj.wind_speed)} mp/h</Td>
										</Tr>
									);
							  })
							: null}
					</Tbody>
				</Table>
			</TableContainer>
		</Container>
	);
}
