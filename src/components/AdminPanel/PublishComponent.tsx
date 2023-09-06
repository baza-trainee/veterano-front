import Switch from "../Switch/Switch.tsx";
import Button from "../Button/Button.tsx";
import CustomCalendar from "./Calendar/CustomCalendar.tsx";
import { FC, useState } from "react";

interface  PublishComponentProps{
	isEnabled: boolean,
	setIsChecked: (data: boolean) => void,
	publication: string,
	isValid: boolean,
	onValueSelected: (date: string) => void,

}
const PublishComponent: FC<PublishComponentProps> = ({isEnabled, setIsChecked, publication, isValid, onValueSelected}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="h-[226px] bg-white py-6 px-[42px] relative rounded ">
			<div className={"h-full flex flex-col justify-between min-w-[200px]"}>
				<div className={"flex flex-col"}>
					<div className={"flex items-center mb-4 text-[14px] text-grey100"}>
						Стан: <span
						className={"block underline ml-4 w-[100px]"}>{isEnabled ? "активний" : "неактивний"}</span>
						<Switch
							isChecked={isEnabled || false}
							setIsChecked={setIsChecked}
						/>
					</div>

					<div className={"flex items-center text-[14px] relative"}>
						Дата публікації:
						<button
							onClick={(e) => {
								e.preventDefault()
								setIsOpen(!isOpen);
							}}
							className={"underline cursor-pointer p-2"}>
							{publication}
						</button>
					</div>
				</div>
				<div className={'w-[210px]'}>
					<Button
						variant={"primary"}
						size={"large"}
						type="submit"
						disabled={!isValid}
					>Опублікувати</Button>
				</div>
			</div>
			{isOpen &&
				<CustomCalendar
					setIsOpen={setIsOpen}
					onValueSelected={onValueSelected}
				/>}
		</div>
	);
};

export default PublishComponent;