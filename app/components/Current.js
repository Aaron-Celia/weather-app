"use client";
import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	Stack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UseGlobalContext } from "../GlobalContext";

export default function Current() {
	const [description, setDescription] = useState("");
	const [sunrise, setSunrise] = useState("");
	const [sunset, setSunset] = useState("");
	const { current } = UseGlobalContext();
	const des = current?.weather[0]?.description;
	const unixSunsetData = current?.sunset;
	const unixSunriseData = current?.sunrise;
	const formatData = () => {
		let arr = des.split(" ");
		arr = arr.map((word) => {
			let subArr = word.split("");
			let letter = subArr.shift().toUpperCase();
			subArr.unshift(letter);
			return subArr.join("");
		});
		setDescription(arr.join(" "));

		const AMSunrise = new Date(unixSunriseData * 1000);
		const PMSunset = new Date(unixSunsetData * 1000);
		const AMhours = ("0" + AMSunrise.getHours()).slice(-2);
		const AMminutes = ("0" + AMSunrise.getMinutes()).slice(-2);
		const PMHours = ("0" + PMSunset.getHours()).slice(-2);
		const PMMinutes = ("0" + PMSunset.getMinutes()).slice(-2);

		setSunrise(`${AMhours}:${AMminutes}`);
		setSunset(`${PMHours}:${PMMinutes}`);
	};
	useEffect(() => {
		if (des && unixSunriseData && unixSunsetData) {
			formatData();
		}
	}, [current]);

	const unitDetailsStyle = {
		fontSize: "xl",
		m: "0px",
		h: "14%",
		display: "flex",
		justifyContent: "flex-end"
	};

	const detailLabelStyle = {
		fontSize: "xl",
		m: "0px",
		h: "14%",
		ml: '8px'
	};

	const containerStyle = {
		maxW: "5xl",
		backgroundColor: "white",
		position: "fixed",
		top: "42vh",
		left: "0px",
		bottom: "5vh",
		right: "0px",
		borderRadius: "lg",
		color: 'black'
	};

	const leftHalfStyle = {
		flex: "1",
		justifyContent: "space-around",
		height: "100%",
		m: "0px"
	};

	return (
		<Container sx={containerStyle}>
			<Flex h="100%">
				<Stack sx={leftHalfStyle}>
					<Heading fontSize="7xl" textAlign="center">
						{Math.round(current?.temp)}&deg;
					</Heading>
					<Heading textAlign="center">{description ? description : ""}</Heading>
				</Stack>
				<Divider orientation="vertical" />
				<Flex flex="1">
					<Stack h="100%" flex="1">
						<Box sx={detailLabelStyle}>Feels Like</Box>
						<Box sx={detailLabelStyle}>Humidity</Box>
						<Box sx={detailLabelStyle}>Dew Point</Box>
						<Box sx={detailLabelStyle}>Wind Speed</Box>
						<Box sx={detailLabelStyle}>UV Index</Box>
						<Box sx={detailLabelStyle}>Sunrise</Box>
						<Box sx={detailLabelStyle}>Sunset</Box>
					</Stack>
					<Stack h="100%">
						<Box sx={unitDetailsStyle}>
							{Math.round(current?.feels_like)}&deg;
						</Box>
						<Box sx={unitDetailsStyle}>{Math.round(current?.humidity)}%</Box>
						<Box sx={unitDetailsStyle}>
							{Math.round(current?.dew_point)}&deg;
						</Box>
						<Box sx={unitDetailsStyle}>
							{Math.round(current?.wind_speed)} mp/h
						</Box>
						<Box sx={unitDetailsStyle}>{Math.round(current?.uvi)}/11</Box>
						<Box sx={unitDetailsStyle}>{sunrise ? sunrise : ""}</Box>
						<Box sx={unitDetailsStyle}>{sunset ? sunset : ""}</Box>
					</Stack>
				</Flex>
			</Flex>
		</Container>
	);
}
