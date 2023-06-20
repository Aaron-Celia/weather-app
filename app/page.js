"use client";
import { Container, Heading } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { UseGlobalContext } from "./GlobalContext";
import SearchBar from "./components/SearchBar";
import SelectedLocation from "./components/SelectedLocation";

export default function Home() {
	const { longitude, latitude } = UseGlobalContext();
	const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(longitude && latitude){
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }, [longitude, latitude])
		return (
			<div className='bg-img'>
				<Container maxW="5xl">
					<Heading my="30px" p="10px" color="blue.400" textAlign="center">
						Weather App
					</Heading>
					<SearchBar />
					<SelectedLocation />
				</Container>
			</div>
		);
}
