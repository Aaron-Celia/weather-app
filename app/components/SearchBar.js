"use client";
import { Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { UseGlobalContext } from "../GlobalContext";

export default function SearchBar() {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([{}]);
	const searchRef = useRef();
	const {
		setSelectedCity,
		setSelectedState,
		setLatitude,
		setLongitude
	} = UseGlobalContext();

	const guessResults = async () => {
		const res = await axios.get(
			`https://api.maptiler.com/geocoding/${query}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`
		);
		setSuggestions([...res.data.features]);
	};

	const searchCities = async (query, location = '') => {
		if(location.length){
			const res = await axios.get(
				`https://api.maptiler.com/geocoding/${location}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`
			);
			const { center, place_name_en } = res.data.features[0];
			const place = place_name_en.split(", ");
			setLongitude(center[0]);
			setLatitude(center[1]);
			setSelectedCity(place[0]);
			setSelectedState(place[1]);
			setSuggestions([{}]);
			setQuery("");
		} else {
			const res = await axios.get(
				`https://api.maptiler.com/geocoding/${query}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`
			);
			const { center, place_name_en } = res.data.features[0];
			const place = place_name_en.split(", ");
			setLongitude(center[0]);
			setLatitude(center[1]);
			setSelectedCity(place[0]);
			setSelectedState(place[1]);
			setSuggestions([{}]);
			setQuery('');
		}
	};

	useEffect(() => {
		searchRef.current.focus();
	}, []);

	useEffect(() => {
		if (query.length >= 3) {
			setTimeout(() => {
				guessResults();
			}, 10);
		}
		if(query.length < 3){
			setSuggestions([{}])
		}
	}, [query]);

	const sugStyles = {
		flexDirection: 'column',
		overflow: "scroll",
		maxH: "20vh",
		position: 'absolute',
		backgroundColor: 'white',
		color: 'black',
		maxW: '5xl'
	};

	const singleSugStyles = {
		padding: "3",
		alignItems: "center",
		borderTop: 'solid 1px black',
		borderBottom: 'solid 1px black',
		margin: '0px',
		cursor: 'pointer'
	};

	return (
		<Container maxW="4xl">
			<Flex>
				<Input
					placeholder="Search the entire world..."
					size="lg"
					ref={searchRef}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					variant="outline"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							searchCities(query);
						}
					}}
				/>
				<Button
					onClick={(e) => {
						e.preventDefault();
						searchCities();
					}}
					color='white'
					mt='3px'
					variant="outline">
					Search
				</Button>
			</Flex>
			<Flex sx={sugStyles}>
				{suggestions.length > 1
					? suggestions.map((sug) => (
							<Flex onClick={(e) => {
								e.preventDefault();
								searchCities(query, sug.place_name_en)
							}} sx={singleSugStyles}>
								<Text>{sug.place_name_en}</Text>
							</Flex>
					  ))
					: null}
			</Flex>
		</Container>
	);
}
