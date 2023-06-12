"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import {
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	Provider,
	useState
} from "react";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	colors: {
		brand: {
			900: "#40128B",
			800: "#9336B4",
			700: "#DD58D6"
		}
	}
});

const GlobalContext = createContext({
	selectedCity: "",
	setSelectedCity: () => "",
    selectedState: '',
    setSelectedState: () => '',
    latitude: 0,
    setLatitude: () => 0,
    longitude: 0,
    setLongitude: () => 0
});

export default function GlobalContextFunction({ children }) {
	const [selectedCity, setSelectedCity] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	return (
		// <CacheProvider>
			<ChakraProvider theme={theme}>
				<GlobalContext.Provider value={{ selectedCity, setSelectedCity, selectedState, setSelectedState, latitude, setLatitude, longitude, setLongitude }}>
					{children}
				</GlobalContext.Provider>
			</ChakraProvider>
		// </CacheProvider>
	);
}

export const UseGlobalContext = () => {
	return useContext(GlobalContext);
};
