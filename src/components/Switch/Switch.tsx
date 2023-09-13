import { FC } from "react";

interface SwitchPropsType {
	isChecked: boolean;
	onChange: (isChecked: boolean) => void;
	disabled?: boolean

}
const Switch:FC<SwitchPropsType> = ( {isChecked, onChange, disabled=false}) => {

	const style = disabled ? "switch-label pointer-events-none" : "switch-label"
	return (

		<label
			className={`${style} ${isChecked ? 'switch-on' : ''} `}
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