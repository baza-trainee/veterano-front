import { IoCloseSharp } from "react-icons/io5";
import { FC } from "react";


type IconCloseProps = {
	disabled?: boolean
}
const IconClose: FC<IconCloseProps> = ({ disabled = false} ) => {
	return (

		<div className={`w-9 h-9 flex justify-center items-center rounded ${disabled ? "bg-grey50 pointer-events-none" : "bg-white cursor-pointer hover:border hover:bg-yellow30 active:bg-yellow100 active:border-0 active:rounded"} `}>
			<IoCloseSharp size={30} color={disabled ? "white" : "black"}/>
		</div>
	);
};

export default IconClose;