import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	tabIndex?: number;
}

const SearchBar: FC<SearchBarProps> = ({
	value,
	onChange,
	placeholder,
	error,
	disabled = "false",
	...props
}) => {
	const [isFocused, setIsFocused] = useState<boolean | null>(false);
	const [errors, setErrors] = useState<string | null>(null);

	useEffect(() => {
		if (error && error.trim() !== "") {
			setErrors(error);
		} else {
			setErrors(null);
		}
	}, [value]);

	return (
		<div
			tabIndex={props.tabIndex}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			className={
				disabled
					? "search-wrapper-disabled"
					: errors
					? "search-wrapper-error"
					: "search-wrapper"
			}
		>
			<input
				className={
					disabled
						? "search-input-disabled"
						: "search-input placeholder:text-[#AFAFAF] "
				}
				id="search"
				type="text"
				value={value}
				onChange={(e) => onChange(e)}
				placeholder={placeholder}
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
				<button type="submit">
					<AiOutlineSearch size={24} color={isFocused ? "white" : "black"} />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
