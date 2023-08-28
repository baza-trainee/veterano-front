import { useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";
interface ImageInput {
	onChange: (preview: string) => void;
	className?: string;
	id?: string;
	src?: string;
}
const ImageInput = ({
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
	const [file, setFile] = useState<Blob>();
	useEffect(() => {
		onChange(preview);
	}, [preview]);
	return (
		<>
			{isCropeningImg && file && (
				<ImageCroper
					aspect={265 / 232}
					src={file && URL.createObjectURL(file)}
					onClose={(url: string) => {
						console.log(isCropeningImg);
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
