import React from "react";
import Container from "../components/Container/Container";

export const PrivacyPolic = () => {
	return (
		<Container>
			<embed
				src={"/files/pol_conf.pdf" + "#toolbar=0"}
				type="application/pdf"
				className="w-full h-screen border-none"
			/>
		</Container>
	);
};
