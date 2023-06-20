import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { UseGlobalContext } from "../GlobalContext";


export default function Daily() {
    const { daily } = UseGlobalContext();

    	const itemStyle = {
				backgroundColor: "gray.100",
				color: "black",
				marginBottom: "8px",
				justifyContent: "space-around",
				alignItems: "center",
				fontSize: "18px",
				paddingRight: "20px",
				height: "40px"
			};

      const tableHeadStyle = {
        backgroundColor: 'black',
        color: 'white'
			};

  return (
      <TableContainer borderRadius='2xl'>
        <Table>
          <Thead sx={tableHeadStyle}>
            <Th>Day</Th>
            <Th>Sunrise</Th>
            <Th>Sunset</Th>
            <Th>High / Low</Th>
          </Thead>
          <Tbody>
            {daily
            ? daily.map((obj, index) => {
              const date = new Date(obj.dt * 1000)
              const day = date.getDay();
              const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
              const sunrise = new Date(obj.sunrise * 1000)
              const sunriseHour = ('0' + sunrise.getHours()).slice(-2);
              const sunriseMin = ("0" + sunrise.getMinutes()).slice(-2);
              const sunset = new Date(obj.sunset * 1000)
              const sunsetHour = ('0' + sunset.getHours()).slice(-2);
              const sunsetMin = ("0" + sunset.getMinutes()).slice(-2);
              return (
                <Tr sx={itemStyle} key={index}>
											<Td fontWeight="bold">{names[day]}</Td>
											<Td>{sunriseHour}:{sunriseMin}</Td>
											<Td>{sunsetHour}:{sunsetMin}</Td>
											<Td>{Math.round(obj.temp.max)} / {Math.round(obj.temp.min)}</Td>
								</Tr>
              )
            })
          : null}
          </Tbody>
        </Table>
      </TableContainer>
  );
}
