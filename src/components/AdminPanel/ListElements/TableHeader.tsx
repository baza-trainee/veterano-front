import React, { FC, useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal.tsx";

interface TableHeaderProps{
	checked: boolean,
	name:string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	onClick: () => void
}
const TableHeader: FC<TableHeaderProps> = ({checked, name, onChange, onClick}) => {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={"flex mt-6 border-b border-black items-center justify-between font-light "}>
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
				onClick={() => setIsOpen(true)}>
				<img src="/images/admin/bin.svg" alt="bin" />
			</div>

			{isOpen &&
				<ConfirmModal
					onClick={onClick}
					active={isOpen}
					setActive={setIsOpen}
				/>
			}
		</div>
	);
};

export default TableHeader;