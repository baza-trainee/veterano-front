import { BiSolidPencil } from "react-icons/bi";

const IconPen = () => {

	return (
		<div className={'w-9 h-9 hover:border hover:rounded hover:border-black flex justify-center items-center active:bg-yellow100 active:border-0 active:rounded'}>
			<BiSolidPencil size={24}/>
		</div>
	);
};

export default IconPen;