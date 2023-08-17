import { FormEvent } from "react";
import SearchBar from "../SearchBar/SearchBar";
import DropDown from "../DropDown/DropDown";

interface HeroSearchBarProps {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const HeroSearchBar: React.FC<HeroSearchBarProps> = ({
	onSubmit = (event: FormEvent<HTMLFormElement>) => {
		console.log(event);
	},
}) => {
	return (
		<form action="" onSubmit={onSubmit}>
			<SearchBar
				id="query"
				value=""
				onChange={(e) => {
					console.log(e);
				}}
			/>
			<DropDown
				cities={[]}
				value="lviw"
				onChange={(e) => {
					console.log(e);
				}}
				setValue={(e) => {
					console.log(e);
				}}
				placeholder=""
			/>
		</form>
	);
};
export default HeroSearchBar;
