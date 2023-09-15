import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useURLParams } from "../../hooks/useURLParams.tsx";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
	id?: string,
	value: string,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder?: string,
	disabled?: boolean
	error?: string,
	tabIndex?: number;
	style?: React.CSSProperties,
	onSubmit?: () => void
}

const SearchBar: FC<SearchBarProps> = ({
																				 value,
																				 onChange,
																				 placeholder,
																				 error,
																				 disabled = "false",
																				 onSubmit,
																				 ...props
																			 }) => {
	const [isFocused, setIsFocused] = useState<boolean | null>(false);
	const [errors, setErrors] = useState<string | null>(null);
	const [isManuallyEdited, setIsManuallyEdited] = useState(false);
	const paramsValue = useURLParams("q")

	useEffect(() => {

		if (error && error.trim() !== "") {
			setErrors(error);
		} else {
			setErrors(null);
		}
	}, [value, error]);

	return (
		<div tabIndex={props.tabIndex}
				 onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
				 className={
					 disabled
						 ? "search-wrapper-disabled h-[48px]"
						 : errors
							 ? "search-wrapper-error h-[48px]"
							 : "search-wrapper h-[48px]"
				 }
		>
			<input
				className={
					disabled
						? "search-input-disabled"
						: errors
							? "search-input placeholder:text-error50"
							: "search-input placeholder:text-grey50"
				}
				id="search"
				type="text"
				value={isManuallyEdited ? value : paramsValue || value}
				onChange={e => {
					setIsManuallyEdited(true);
					if (onChange) {
						onChange(e);
					}
				}}
				placeholder={placeholder}
				{...props}
			/>

			{disabled ? (
				<button disabled>
					<AiOutlineSearch size={24} color="#808080" />
				</button>
			) : errors ? (
				<button type="submit">
					<AiOutlineSearch size={24} color="#808080" />
				</button>
			) : (
				<button type="submit" onClick={onSubmit}>
					<AiOutlineSearch size={24} color={isFocused ? "white" : "black"} />
				</button>
			)}
		</div>
	);
};

export default SearchBar;