import { FC, useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";
interface ImageInput {
	onSelectedImg: (preview: string) => void;

}
const ImageInput: FC<ImageInput> = ({
onSelectedImg
}) => {
	const [isCropeningImg, setIsCropeningImg] = useState<boolean>(false);
	const [preview, setPreview] = useState<string>("");
	const [file, setFile] = useState<Blob>();
	useEffect(() => {
		if (preview !== "") {
			onSelectedImg(preview);
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
				src={preview}
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
