import { FC, useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";

interface ImageInput {
	onChange: (preview: string) => void;
	height?: number;
	width?: number;
	className?: string;
	id?: string;
	src?: string;
	name?: string;
	error? : string


}

const ImageInput: FC<ImageInput> = ({
																			onChange = (preview: string) => {
																				console.log(preview);
																			},
																			id = "",
																			className = "",
																			src = "",
																			...props
																		}) => {
	const [isCropeningImg, setIsCropeningImg] = useState<boolean>(false);
	const [preview, setPreview] = useState<string>("");
	const [file, setFile] = useState<Blob | undefined>();

	useEffect(() => {
		if (src) {
			onChange(src);
		} else {
			onChange(preview);
		}
	}, [preview]);

	return (
		<>
			{isCropeningImg && file && (
				<ImageCroper
					aspect={265 / 232}
					src={file && URL.createObjectURL(file)}
					onClose={(url: string) => {
						setPreview(url);
						setIsCropeningImg(false);
					}}
				/>
			)}
			<FileDrop
				{...props}
				id={id}
				className={className}
				src={preview || src}
				openEditer={() => {
					setIsCropeningImg(true);
				}}
				removeFile={() => {
					setPreview("");
				}}
				onFileChoise={(file, isCropeting) => {
					setFile(file);
					setIsCropeningImg(isCropeting);
				}}
			/>
		</>
	);
};

export default ImageInput;
