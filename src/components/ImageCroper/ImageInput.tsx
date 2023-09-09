import { FC, useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";
// 265 / 232

interface ImageInput {
	onChange: (preview: string) => void;
	height?: number;
	width?: number;
	className?: string;
	id?: string;
	src?: string;
	name?: string;
	error? : string;
	page? : string;
}
const ImageInput: FC<ImageInput>= ({
																		 onChange,
																		 id = "",
																		 className = "",
																		 src = "",
																		 height = 94,
																		 width = 215,
																		 ...props

																	 }) => {
	const [isCropeningImg, setIsCropeningImg] = useState<boolean>(false);
	const [preview, setPreview] = useState<string>("");
	const [file, setFile] = useState<Blob | null>();

	useEffect(() => {
		onChange(preview);
	}, [preview]);

	useEffect(() => {
		if (!preview) {
			setPreview(src);
		}
	}, [src]);


	return (
		<>
			{isCropeningImg && (
				file ? (
					<ImageCroper
						aspect={width / height}
						src={URL.createObjectURL(file)}
						onClose={(url: string) => {
							setPreview(url);
							setIsCropeningImg(false);
						}}
					/>
				) : (
					<ImageCroper
						aspect={width / height}
						src={src}
						onClose={(url: string) => {
							setPreview(url);
							setIsCropeningImg(false);
						}}
					/>
				)
			)}
			<FileDrop
				{...props}
				id={id}
				className={className}
				src={preview}
				imgHeight={height}
				imgWidth={width}
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
