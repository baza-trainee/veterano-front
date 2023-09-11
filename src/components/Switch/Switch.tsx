import { FC } from "react";

interface SwitchPropsType {
	isChecked: boolean;
	onChange: (isChecked: boolean) => void;
}
const Switch:FC<SwitchPropsType> = ( {isChecked, onChange}) => {
	return (

		<label
			className={`switch-label ${isChecked ? 'switch-on' : ''} `}
		>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={() => onChange(!isChecked)}
				style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
			/>
		</label>
	);
};

export default Switch;