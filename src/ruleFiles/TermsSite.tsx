import Container from "../components/Container/Container";

export const TermsSite = () => {
	return (
		<embed
			src={"/files/site_rules.pdf" + "#toolbar=0"}
			type="application/pdf"
			className="w-full h-screen border-none"
		/>
	);
};
