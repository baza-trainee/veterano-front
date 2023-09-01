import { useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";
// 265 / 232

interface ImageInput {
	onChange: (preview: string) => void;
	className?: string;
	id?: string;
	src?: string;
	height?: number;
	width?: number;
}
const ImageInput = ({
	onChange = (preview: string) => {
		console.log(preview);
	},
	id = "",
	className = "",
	src = "",
	height = 94,
	width = 215,
	...props

}) => {
	const [isCropeningImg, setIsCropeningImg] = useState<boolean>(false);
	const [preview, setPreview] = useState<string>("");
	const [file, setFile] = useState<Blob>();

	useEffect(() => {
		onChange(preview);
	}, [preview]);
	return (
		<>
			{isCropeningImg && file && (
				<ImageCroper
					aspect={width / height}
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
