import { FC } from "react";

interface SwitchPropsType {
	isChecked: boolean;
	setIsChecked: (value: boolean) => void;

}
const Switch:FC<SwitchPropsType> = ( {isChecked, setIsChecked}) => {

	return (

		<label
			className={`switch-label ${isChecked ? 'switch-on' : ''} `}
		>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={() => setIsChecked(!isChecked)}
				style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
			/>
		</label>
	);
};

export default Switch;