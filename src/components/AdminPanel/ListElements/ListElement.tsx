import IconPen from "../IconButtons/IconPen.tsx";
import { FC } from "react";

type ListElementProps = {
	name: string,
	status: string,
	date: string,
	editHandler?: () => void,
	removeHandler?: () => void,

}
const ListElement: FC<ListElementProps> = ({ name, status, date, editHandler, removeHandler }) => {

	return (
		<div className={"bg-white flex mx-10 mt-6 items-center justify-between "}>
			<div className={"flex gap-[18px] items-center"}>
				<div className={"w-[48px] h-[48px] p-3 check-wrapper "}>
					<label className="custom-checkbox">
						<input type="checkbox" className={"hidden"} />
						<span className="checkmark"></span>
					</label>
				</div>
				<div>{name}</div>
			</div>
			<div>{status}</div>
			<div>{date}</div>
			<div className={"flex"}>
				<div
					onClick={editHandler}>
					<IconPen />
				</div>
				<div
					className={"w-[36px] h-[36px] flex items-center justify-center "}
					onClick={removeHandler}>
					<img src="/images/admin/bin.svg" alt="bin" />
				</div>
			</div>
		</div>
	);
};

export default ListElement;