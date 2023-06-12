"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../GlobalContext";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function SelectedLocation() {
    const [hourly, setHourly] = useState([]);
	const [daily, setDaily] = useState([]);
	const [current, setCurrent] = useState(() => {});
    const [initialComplete, setInitialComplete] = useState(false)
    
    const { selectedCity, setSelectedCity, selectedState, setSelectedState, latitude, setLatitude, longitude, setLongitude } = UseGlobalContext();

	const findUser = async () => {
		const res = await axios.get("https://api-bdc.net/data/ip-geolocation", {
			params: {
				key: process.env.NEXT_PUBLIC_LOCATION_API_KEY
			}
		});
        console.log('findUser res: ', res);
		const { localityName, principalSubdivision } = res.data.location;
		const { registeredCountryName } = res.data.network;
		setLatitude(res.data.location.latitude);
		setLongitude(res.data.location.longitude);
        setSelectedCity(localityName);
        setSelectedState(principalSubdivision)
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
                    units: 'imperial'
				}
			}
		);
        console.log(res);
		setData(res);
        setInitialComplete(true);
	};
    
	useEffect(() => {
        console.log('first use effect')
        findUser();
	}, []);
    useEffect(() => {
        console.log('second useEffect')
        getWeather();
        console.log('lat: ', latitude);
        console.log('lon: ', longitude);
    }, [latitude, longitude])
	return (
    <Container maxW="5xl" mt='10'>
        <Heading as='h4'>{selectedCity}, {selectedState}</Heading>
        <Box>
            <Text as='h4'>Current Weather</Text>
        </Box>
    </Container>
    )
}
