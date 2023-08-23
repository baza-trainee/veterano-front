import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface FileDropProps {
	src?: string;
	onFileChoise(file: File, isCropening: boolean): void;
	openEditer?(): void;
	removeFile?(): void;
}
export const FileDrop: React.FC<FileDropProps> = ({
	src,
	onFileChoise,
	openEditer,
	removeFile,
}) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
	useEffect(() => {
		onFileChoise(acceptedFiles[0], !!acceptedFiles[0]);
	}, [acceptedFiles]);
	return (
		<div className="flex items-center justify-start flex-col p-[10px] w-[305px] h-[298px]">
			<div
				{...getRootProps({
					className:
						"flex items-center justify-center flex-col w-full h-[298px]",
				})}
			>
				<input {...getInputProps()} required id="photo" type="file" />
				{src ? (
					<img height="232" width="265" src={src} alt="Preview" />
				) : (
					<p className="flex items-center gap-[12px]">
						<img src="./public/admin/download-icon.svg" alt="" />
						Завантажити зображення
					</p>
				)}
			</div>
			{src && (
				<div className="w-full flex items-center justify-end gap-[12px]">
					{openEditer && (
						<button onClick={openEditer} className="w-[36px] h-[36px]">
							1
						</button>
					)}
					{removeFile && (
						<button onClick={removeFile} className="w-[36px] h-[36px]">
							2
						</button>
					)}
				</div>
			)}
		</div>
	);
};
