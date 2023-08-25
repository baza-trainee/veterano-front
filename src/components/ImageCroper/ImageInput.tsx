import { FC, useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";
import { blobToBase64 } from "../AdminPanel/BlobToBase64.ts";
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
			// Перетворення Blob на Base64
			blobToBase64(file)
				.then((base64String) => {
					onSelectedImg(base64String);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}, [preview, file, onSelectedImg]);
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
