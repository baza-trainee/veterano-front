import React, { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";
import Button from "../Button/Button";

interface ImageCroperProps {
	onClose: (url: string) => void;
	src: string;
	aspect: number;
}
export const ImageCroper: React.FC<ImageCroperProps> = ({
	src,
	onClose = (url: string) => {
		console.log(url);
	},
	aspect,
}) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [rotation] = useState(0);
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
	const [, setCroppedImage] = useState<unknown>();
	const onCropComplete = useCallback(
		async (_croppedArea: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels);
		},
		[]
	);

	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(
				src,
				croppedAreaPixels,
				rotation
			);
			setCroppedImage(croppedImage);
			return croppedImage;
		} catch (e) {
			console.error(e);
		}
	}, [croppedAreaPixels, rotation, src]);

	return (
		<div
			style={{
				zIndex: 1000000,
			}}
		>
			<Cropper
				style={{
					containerStyle: { backgroundColor: "transparent", zIndex: 10000 },
				}}
				image={src}
				crop={crop}
				zoom={zoom}
				aspect={aspect}
				onCropChange={setCrop}
				onCropComplete={onCropComplete}
				onZoomChange={setZoom}
			/>

			<Button
				type={'button'}
				style={{
					position: "absolute",
					right: 16,
					bottom: 16,
					zIndex: 10000,
					minWidth: "48px",
					minHeight: "48px",
				}}
				onClick={async () => {
					const url = await showCroppedImage();
					onClose(`${url}`);
				}}
			>
				Обрізати
			</Button>
		</div>
	);
};
