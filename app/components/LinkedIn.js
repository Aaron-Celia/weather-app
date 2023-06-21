import Image from "next/image";
import linkedInLogo from '../public/Linkedin-logo-png.png'
import { Text } from "@chakra-ui/react";
import { Lobster } from "next/font/google";

const lobster = Lobster({
    subsets: ['latin'],
    weight: '400'
})

export default function LinkedIn() {
  return (
		<div>
			<Text className={`${lobster.className} name`} fontSize="20px">
				Aaron Celia
			</Text>
			<a
				className="linked-in"
				href="https://www.linkedin.com/in/aaron-celia/"
				target="_blank">
				<Image
					height={20}
					width={80}
					alt="Linked In Logo Link"
					src={linkedInLogo}
				/>
			</a>
		</div>
	);
}
