'use client';
import { Box, Container, Text, Heading } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import SelectedLocation from "./components/SelectedLocation";
// import SearchBar from "./components/SearchBar";
// import SelectedLocation from "./components/SelectedLocation";

export default function Home() {

	return (
		<Container maxW='5xl'>
            <Heading my='30px' p='10px' color='blue.400' textAlign='center'>Weather App</Heading>
            <SearchBar />
            <SelectedLocation />
		</Container>
	);
}
