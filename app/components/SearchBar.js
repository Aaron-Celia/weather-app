"use client";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { UseGlobalContext } from "../GlobalContext";

export default function SearchBar() {
	const [query, setQuery] = useState('');
	const searchRef = useRef()
	const {
		selectedCity,
		setSelectedCity,
		selectedState,
		setSelectedState,
		latitude,
		setLatitude,
		longitude,
		setLongitude
	} = UseGlobalContext();

	const searchCities = async (query) => {
		const res = await axios.get(`https://geocode.maps.co/search?q=${query}`);
		const { data } = res;
		if(data[0]){
			const { display_name, lat, lon } = data[0];
			const array = display_name.split(', ');
			setSelectedCity(array[0]);
			setSelectedState(array[2]);
			setLatitude(lat);
			setLongitude(lon);
		}
		setQuery('');
	}

	useEffect(() => {
	  searchRef.current.focus();
	}, []);

	return (
		<Input
		placeholder='City name...'
		size='lg'
		ref={searchRef}
		value={query}
		onChange={(e) => setQuery(e.target.value)}
		variant='filled'
		onKeyDown={(e) => {
			if(e.key === 'Enter'){
				searchCities(query)
			}
		}}
		 />
	);
}
