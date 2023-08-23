import IconPen from "../IconButtons/IconPen.tsx";
import { FC } from "react";

type ListElementProps = {
	id: number,
	name: string,
	status: string,
	date: string,
	editHandler?: () => void,
	removeHandler?: () => void,
	checked: boolean,
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
const ListElement: FC<ListElementProps> = ({ id, onChange, name, status, date, editHandler, removeHandler, checked }) => {

	return (
		<div id={id.toString()} className={"bg-white flex mt-6 items-center justify-between "}>
			<div className={"flex gap-[18px] w-[439px]  items-center"}>
				<div className={"w-[48px] h-[48px] p-3 check-wrapper "}>
					<label className="custom-checkbox">
						<input type="checkbox" className={"hidden"} checked={checked} onChange={onChange}/>
						<span className="checkmark"></span>
					</label>
				</div>
				<div>{name}</div>
			</div>
			<div>{status}</div>
			<div>{date}</div>
			<div className={"flex"}>
				<div
					className={'cursor-pointer'}
					onClick={editHandler}>
					<IconPen />
				</div>
				<div
					className={"w-[36px] h-[36px] flex items-center justify-center cursor-pointer "}
					onClick={removeHandler}>
					<img src="/images/admin/bin.svg" alt="bin" />
				</div>
			</div>
		</div>
	);
};

export default ListElement;