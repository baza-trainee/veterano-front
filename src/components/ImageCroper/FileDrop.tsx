import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidTrash, BiSolidPencil } from "react-icons/bi";

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
		<div className="flex items-center justify-start flex-col p-[10px] w-[305px] h-[298px] ">
			<div
				{...getRootProps({
					className:
						"flex items-center justify-center flex-col w-full h-[298px] hover:cursor-pointer",
				})}
			>
				<input {...getInputProps({ name: 'image' })} id="photo" type="file"/>
				{src ? (
					<img height="232" width="265" src={src} alt="Preview" />
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
