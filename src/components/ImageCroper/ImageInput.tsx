import { FC, useEffect, useState } from "react";
import { FileDrop } from "./FileDrop";
import { ImageCroper } from "./ImageCroper";
import { blobToBase64 } from "../AdminPanel/BlobToBase64.ts";

interface ImageInput {
	onChange?: (preview: string) => void;
	height?: number;
	width?: number;
	onSelectedImg: (preview: string) => void;
	initialImage?: string,

}
const ImageInput: FC<ImageInput> = ({
	onChange = (preview: string) => {
		console.log(preview);
	},
	height = 94,
	width = 215,
	onSelectedImg,
	initialImage
}) => {
	const [isCropeningImg, setIsCropeningImg] = useState<boolean>(false);
	const [preview, setPreview] = useState<string | undefined>('');
	const [file, setFile] = useState<Blob | undefined>();


	useEffect(() => {
		if (preview !== "" && file) {
			blobToBase64(file)
				.then((base64String) => {
					if (typeof base64String === "string") {
						onSelectedImg(base64String);
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}, [preview, file, onSelectedImg, initialImage]);

	useEffect(() => {
		if (initialImage) {
			setPreview(initialImage);
		}
	}, [initialImage]);

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
