import React, { FC } from "react";

interface TableHeaderProps{
	checked: boolean,
	name:string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onClick: () => void
}
const TableHeader: FC<TableHeaderProps> = ({checked, name, onChange, onClick}) => {
	return (
		<div className={"flex mt-6 border-b border-black items-center justify-between "}>
			<div className={"flex gap-[18px] w-[439px] items-center"}>
				<div className={"w-[48px] h-[48px] p-3 check-wrapper "}>
					<label className="custom-checkbox">
						<input
							type="checkbox"
							className={"hidden"}
							checked={checked}
							onChange={onChange} />
						<span className="checkmark"></span>
					</label>
				</div>
				<div>{name}</div>
			</div>
			<div>Стан</div>
			<div className={"ml-[32px]"}>Дата</div>
			<div
				className={"w-[36px] h-[36px] ml-[78px] flex items-center justify-center cursor-pointer "}
				onClick={onClick}>
				<img src="/images/admin/bin.svg" alt="bin" />
			</div>
		</div>
	);
};

export default TableHeader;