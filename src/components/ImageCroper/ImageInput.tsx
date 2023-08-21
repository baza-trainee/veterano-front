import { useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageChoper } from "./ImageCroper";
interface ImageInput {
	onChange: (preview: string) => void;
}
const ImageInput = ({
	onChange = (preview: string) => {
		console.log(preview);
	},
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
				<ImageChoper
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
				src={preview}
				onFileChoise={(file, isCropeting) => {
					setFile(file);
					setIsCropeningImg(isCropeting);
				}}
			/>
		</>
	);
};

export default ImageInput;
