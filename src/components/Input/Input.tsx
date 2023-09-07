import { FC, InputHTMLAttributes, MouseEventHandler } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	value: string;
	error?: string;
	onMouseDown?: MouseEventHandler<HTMLDivElement>;
	type: string;
	passwordVisible?: boolean;
	className?: string;
}

const Input: FC<InputProps> = ({
	error,
	passwordVisible,
	id,
	type,
	onMouseDown,
	value,
	label,
	...props
}) => {

	const labelStyles = () => {
		let style = `  
    pl-[10px] 
    translate-y-[2.5rem] 
    transition-all 
    duration-300 
		w-full 
		font-light
		leading-[24px] 
		${error ? 'text-error100' : 'text-grey100'}
    peer-focus:leading-[26px] 
    peer-focus:text-[14px] 
    peer-focus:translate-y-[1.9rem]  
    peer-focus:text-grey50
    peer-disabled:text-grey50 
	
    `;
		if (value.length > 0) {
			style = `
      peer 
      peer-invalid:text-error100
      pl-[10px] 
      leading-[26px]
      text-[14px]  
      translate-y-[1.9rem]
      ${error ? 'text-error100' : 'text-grey50'}
      `

		}
		if (error) {
			style += " " + " text-error100 ";
		}

		return style;
	};
	const inputStyles = () => {
		let style = `input-form peer `;

		if (value.length > 0) {
			style = `input-form peer !h-[64px] `;
		}
		if (error) {
			style = `text-error100 input-form !h-[64px] peer border-error100 focus:border-black placeholder-error100`;
		}
		if (error && value.length > 0) {
			style = `input-form peer !h-[64px] border-error100`;
		}
		return style;
	};

	return (
		<div className={` ${props.className} flex flex-col-reverse relative`}>
			<input
				id={id}
				placeholder=""
				value={value}
				type={type}
				{...props}
				className={inputStyles()}
			/>
			{label && (
				<label htmlFor={id} className={labelStyles()}>
					{label}
				</label>
			)}
			{props.name === "password" && (
				<div className="absolute right-[10px] bottom-[10px] cursor-pointer z-10">
					{passwordVisible ? (
						<AiFillEyeInvisible size={24} onMouseDown={onMouseDown} />
					) : (
						<BsFillEyeFill size={24} onMouseDown={onMouseDown} />
					)}
				</div>
			)}
			{error ? (
				<p className="absolute left-[10px] top-[100%] md:top-[104%] text-error100 text-[14px] leading-[26px] font-light">
					{error}
				</p>
			) : null}
		</div>
	);
};

export default Input;
