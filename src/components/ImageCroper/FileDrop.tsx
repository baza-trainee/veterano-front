import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropProps {
	src?: string;
	onFileChoise(file: File, isCropening: boolean): void;
}
export const FileDrop: React.FC<FileDropProps> = ({ src, onFileChoise }) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
	useEffect(() => {
		onFileChoise(acceptedFiles[0], !!acceptedFiles[0]);
	}, [acceptedFiles]);
	return (
		<>
			<div
				{...getRootProps({
					className:
						"flex items-center justify-center p-[10px] w-[285px] h-[279px]",
				})}
			>
				<input {...getInputProps()} required id="photo" type="file" />
				{src ? (
					<img height="285" width="279" src={src} alt="Preview" />
				) : (
					<p>Завантажити зображення</p>
				)}
			</div>
		</>
	);
};
