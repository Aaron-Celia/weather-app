"use client";
import {
	Container,
	Flex,
	Heading,
	Spinner,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../GlobalContext";
import Current from "./Current";
import Daily from "./Daily";
import Hourly from "./Hourly";

export default function SelectedLocation() {
	const [isLoading, setIsLoading] = useState(true);
	const [locationLoading, setLocationLoading] = useState(true);

	const {
		selectedCity,
		setSelectedCity,
		selectedState,
		setSelectedState,
		latitude,
		setLatitude,
		longitude,
		setLongitude,
		setCurrent,
		setHourly,
		setDaily
	} = UseGlobalContext();

	const findUser = async () => {
		const res = await axios.get("https://api-bdc.net/data/ip-geolocation", {
			params: {
				key: process.env.NEXT_PUBLIC_LOCATION_API_KEY
			}
		});
		const { localityName, principalSubdivision } = res.data.location;
		setLatitude(res.data.location.latitude);
		setLongitude(res.data.location.longitude);
		setSelectedCity(localityName);
		setSelectedState(principalSubdivision);
	};

	const setData = (response) => {
		setHourly(response.data.hourly);
		setDaily(response.data.daily);
		const {
			clouds,
			dew_point,
			dt,
			feels_like,
			humidity,
			pressure,
			sunrise,
			sunset,
			temp,
			uvi,
			visibility,
			weather,
			wind_deg,
			wind_speed
		} = response.data.current;
		setCurrent(() => {
			return {
				clouds: clouds,
				dew_point: dew_point,
				dt: dt,
				feels_like: feels_like,
				humidity: humidity,
				pressure: pressure,
				sunrise: sunrise,
				sunset: sunset,
				temp: temp,
				uvi: uvi,
				visibility: visibility,
				weather: weather,
				wind_deg: wind_deg,
				wind_speed: wind_speed
			};
		});
	};

	const getWeather = async () => {
		const res = await axios.get(
			"https://api.openweathermap.org/data/3.0/onecall",
			{
				params: {
					lat: latitude,
					lon: longitude,
					appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_KEY,
					units: "imperial"
				}
			}
		);
		setData(res);
	};

	useEffect(() => {
		findUser();
	}, []);
	useEffect(() => {
		getWeather();
        if(latitude && longitude){
            setLocationLoading(false)
        }
	}, [latitude, longitude]);

    useEffect(() => {
		if (selectedCity && selectedState) {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	}, [selectedCity, selectedState]);

	const tabStyle = {
		color: 'white'
	}

    if(locationLoading){
        return (
					<Container maxW="5xl" mt="10">
						<Stack
							justifyContent="center"
							alignItems="center"
							height="100%"
							width="100%">
							<Heading color='white' as="h4">
                                Getting your location...
							</Heading>
							<Spinner size='lg' />
						</Stack>
					</Container>
				);
    }
    else if (isLoading && selectedCity && selectedState){
        return (
					<Container maxW="5xl" mt="10">
						<Stack
							justifyContent="center"
							alignItems="center"
							height="100%"
							width="100%">
							<Heading color='white' as="h4">
								Loading weather for {selectedCity}{" "}
								{selectedState ? `, ${selectedState}...` : null}
							</Heading>
							<Spinner size="lg"/>
						</Stack>
					</Container>
				);
    }
	return (
		<Container maxW="5xl" mt="10">
			<Heading color='white' as="h4">
				{selectedCity}{selectedState ? `, ${selectedState}` : null}
			</Heading>
			<Tabs variant="soft-rounded" w="100%">
				<TabList
					w="100%"
					display="flex"
					justifyContent="space-between"
					mt="10px">
					<Tab sx={tabStyle}>Current</Tab>
					<Tab sx={tabStyle}>Hourly</Tab>
					<Tab sx={tabStyle}>Daily</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Current />
					</TabPanel>
					<TabPanel>
						<Hourly />
					</TabPanel>
					<TabPanel>
						<Daily />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
}
