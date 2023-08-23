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
		<div className={"bg-white flex mt-6 items-center justify-between "}>
			<div className={"flex gap-[18px] w-[439px]  items-center"}>
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
					className={"w-[36px] h-[36px] flex items-center justify-cente cursor-pointer "}
					onClick={removeHandler}>
					<img src="/images/admin/bin.svg" alt="bin" />
				</div>
			</div>
		</div>
	);
};

export default ListElement;