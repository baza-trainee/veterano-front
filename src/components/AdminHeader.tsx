import { FC } from "react";
import Typography from "./Typography/Typography";

interface HeaderProps {
	name: string;
}

export const AdminHeader: FC<HeaderProps> = ({ name }) => {
	return (
		<div className="hader flex justify-between pl-9 pr-[80px] h-[118px] bg-grey100 items-center">
			<Typography variant="h2" className="text-white">
				{name}
			</Typography>
			<div className="bg-white w-9 h-9 rounded-md flex justify-center items-center">
				<img
					src="/images/admin/close-darkbg.svg"
					className="hover:cursor-pointer"
				/>
			</div>
		</div>
	);
};
