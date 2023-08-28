import { useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";
// 265 / 232
interface ImageInput {
	onChange: (preview: string) => void;
	height?: number;
	width?: number;
}
const ImageInput = ({
	onChange = (preview: string) => {
		console.log(preview);
	},
	height = 94,
	width = 215,
}) => {
	const [isCropeningImg, setIsCropeningImg] = useState<boolean>(false);
	const [preview, setPreview] = useState<string>("");
	const [file, setFile] = useState<Blob>();
	useEffect(() => {
		onChange(preview);
	}, [onChange, preview]);
	return (
		<>
			{isCropeningImg && file && (
				<ImageCroper
					aspect={width / height}
					src={file && URL.createObjectURL(file)}
					onClose={(url: string) => {
						console.log(isCropeningImg);
						setPreview(url);
						setIsCropeningImg(false);
					}}
				/>
			)}
			<FileDrop
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
