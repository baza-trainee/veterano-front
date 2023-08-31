import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidTrash, BiSolidPencil } from "react-icons/bi";

interface FileDropProps {
	src?: string;
	onFileChoise(file: File, isCropening: boolean): void;
	openEditer?(): void;
	removeFile?(): void;
	className: string;
	id?: string;
	imgWidth?: number;
	imgHeight?: number;
}
export const FileDrop: React.FC<FileDropProps> = ({
	src,
	onFileChoise,
	openEditer,
	removeFile,
	className = "",
	id,
	imgWidth = 214,
	imgHeight = 94,
	...props

}) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
	useEffect(() => {
		onFileChoise(acceptedFiles[0], !!acceptedFiles[0]);
	}, [acceptedFiles]);
	return (
		<div
			className={
				"flex items-center justify-start flex-col p-[10px] " +
				" " +
				className
			}
		>
			<div
				{...getRootProps({
					className:
						"flex items-center justify-center flex-col w-full min-w-[305px] min-h-[119px] hover:cursor-pointer",
				})}
			>
				<input id={id} {...getInputProps()} required type="file" {...props} />
				{src ? (
					<img height={imgHeight} width={imgWidth} src={src} alt="Preview" />
				) : (
					<span className="flex items-center gap-[12px]">
						<img src="/admin/download-icon.svg" alt="" />
						Завантажити зображення
					</span>
				)}
			</div>
			{src && (
				<div className="w-full flex items-center justify-end gap-[12px]">
					{openEditer && (
						<button onClick={openEditer} className="w-[36px] h-[36px]">
							<BiSolidPencil size={24} />
						</button>
					)}
					{removeFile && (
						<button onClick={removeFile} className="w-[36px] h-[36px]">
							<BiSolidTrash size={24} />
						</button>
					)}
				</div>
			)}
		</div>
	);
};
