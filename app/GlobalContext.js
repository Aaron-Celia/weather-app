"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
	createContext,
	useContext,
	useState
} from "react";

const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: ""
			}
		})
	}
});


const GlobalContext = createContext({
	selectedCity: "",
	setSelectedCity: () => "",
	selectedState: "",
	setSelectedState: () => "",
	latitude: 0,
	setLatitude: () => 0,
	longitude: 0,
	setLongitude: () => 0,
    current: {},
    setCurrent: () => {},
    hourly: [],
    setHourly: () => [],
    daily: [],
    setDaily: () => []
});

export default function GlobalContextFunction({ children }) {
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [hourly, setHourly] = useState([]);
	const [daily, setDaily] = useState([]);
	const [current, setCurrent] = useState(() => {});
	return (
		<ChakraProvider theme={theme}>
			<GlobalContext.Provider
				value={{
					selectedCity,
					setSelectedCity,
					selectedState,
					setSelectedState,
					latitude,
					setLatitude,
					longitude,
					setLongitude,
                    current,
                    setCurrent,
                    hourly,
                    setHourly,
                    daily,
                    setDaily
				}}>
				{children}
			</GlobalContext.Provider>
		</ChakraProvider>
	);
}

export const UseGlobalContext = () => {
	return useContext(GlobalContext);
};
