import Typography from "../Typography/Typography.tsx";
import SearchBar from "../SearchBar/SearchBar.tsx";
import NavigationLink from "../Links/NavigationLink.tsx";
import { FC } from "react";

interface HeaderComponentProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
}

const HeaderComponent: FC<HeaderComponentProps> = ({ value, onChange, name }) => {
	return (
		<div>
			<div className={"bg-grey100"}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>{name}</Typography>
					<div className={"flex gap-16 h-[48px]"}>
						<SearchBar
							value={value}
							onChange={onChange}
							placeholder={"Введіть ключове слово для пошуку"}
							disabled={false}
							className={"md:w-[280px] lg:w-[400px] text-[14px]"}
						/>
						<NavigationLink to={"add"} variant={"primaryDarkBg"} size={"large"}>Додати</NavigationLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderComponent;