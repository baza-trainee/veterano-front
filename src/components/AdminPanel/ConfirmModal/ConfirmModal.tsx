import ModalWindow from "../../Modal/ModalWindow.tsx";
import React, { FC } from "react";

interface ConfirmModal{
	active:boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	onClick: () => void
}

const ConfirmModal: FC<ConfirmModal> = ({active, setActive, onClick,  }) => {

	return (
		<ModalWindow
			className={"bg-white w-[352px] h-[196px] px-6 py-[32px] flex flex-col gap-6 items-center "}
			style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
			active={active}
			setActive={setActive}
			isImage={false}>
			<div className={"text-[18px] font-medium leading-7"}>
				Підтвердити видалення
			</div>
			<div className={"text-[16px] font-light leading-6"}>
				Ви точно хочете видалити дані?
			</div>
			<div className={"flex gap-6 justify-center items-center text-[16px] font-light leading-6"}>
				<div className={"text-success100 flex items-center gap-2 cursor-pointer"}
						 onClick={() => {
							 onClick()
							 setActive(false)
						 }}>
					<img src="/admin/approve.svg" alt={"approve"} />
					Так
				</div>
				<div className={"text-error50 flex items-center gap-2 cursor-pointer"}
						 onClick={() => setActive(false)}>
					<img src="/admin/cancel.svg" alt={"cancel"} />
					Скасувати
				</div>
			</div>
		</ModalWindow>
	);
};

export default ConfirmModal;