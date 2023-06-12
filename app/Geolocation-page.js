"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
// import { createContext, useContext } from "react";

const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_KEY;

export default function Home({ value }) {
	const [coords, setCoords] = useState({});
	const [hourly, setHourly] = useState([]);
	const [daily, setDaily] = useState([]);
	const [current, setCurrent] = useState(() => {});
	const [alerted, setAlerted] = useState(false);

	// const { selectedCity, setSelectedCity } = CityContext();
	const getLocation = () => {
		console.log("ran");
		if ("geolocation" in navigator) {
			navigator.geolocation.watchPosition(
				(position) => {
					setCoords(position.coords);
					return;
				},
				(error) => {
					return;
				},
				{
					enableHighAccuracy: true,
					maximumAge: 60000,
					timeout: 10000
				}
			);
		}
		return;
	};

	const getWeather = async () => {
		const res = await axios.get(
			`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.latitude}&lon=${coords.longitude}&appid=${appid}`
		);
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
		setData(res);
	};

	useEffect(() => {
		console.log("alerted: ", alerted);
		if (alerted) {
			getLocation();
		}
		if (coords.latitude && coords.longitude && alerted) {
			getWeather();
		}
	}, [alerted, coords.latitude, coords.longitude]);
	// putting hourly, current, or daily here above in the use effects dependency array will cause infinite loop
	if (!alerted) {
		return (
			<div className="flex flex-col justify-center text-white bg-black items-center h-screen w-screen">
				<h1 className="text-2xl font-bold text-center">
					We'd like to show you the weather for your current location, please
					allow it if and when prompted.
				</h1>
				<button
					onClick={() => setAlerted(true)}
					className="bg-green-600 w-[200px] text-white h-[50px] mt-20 rounded-xl hover:cursor-pointer hover:scale-105 duration-200">
					Next
				</button>
			</div>
		);
	} else {
		return (
			<div className="h-screen w-screen pt-40">
				<h1>HOURLY: {JSON.stringify(hourly)}</h1>
				<br />
				<h1>DAILY: {JSON.stringify(daily)}</h1>
				<br />
				<h1>CURRENT: {JSON.stringify(current)}</h1>
			</div>
		);
	}
}
