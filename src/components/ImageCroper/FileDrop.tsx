import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiSolidTrash, BiSolidPencil } from "react-icons/bi";
import { MdOutlineFileDownload } from "react-icons/md";

interface FileDropProps {
	src?: string;
	onFileChoise(file: File, isCropening: boolean): void;
	openEditer?(): void;
	removeFile?(): void;
	className: string;
	id?: string;
	error?: string;
	imgWidth?: number;
	imgHeight?: number;
	page?: string;

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
 const [error, setError] = useState('')
	const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
		accept: {
			'image/jpeg': ['.jpeg'],
			'image/jpg': ['.jpg'],
			'image/png': ['.png']
		},
		maxSize: 300000 // 300 KB
	});

	useEffect(() => {
		if (fileRejections.length > 0) {
			setError('Оберіть зображення менше 300Кб')
		} else {
			onFileChoise(acceptedFiles[0], !!acceptedFiles[0]);
		}
	}, [acceptedFiles, fileRejections]);

	console.log(props.error);

	return (
		<div
			className={
			`${props.page ? 'flex' : 'flex flex-col'}  ${error ? 'items-none' : 'items-center'}  justify-center rounded p-[10px] w-[305px] h-[298px]`
				+ " " +
				className
			}
		>
			<div
				{...getRootProps({
					className:
						`${props.page ? 'min-w-[245px]' : 'min-w-[305px]'} flex items-center justify-center flex-col w-full min-h-[119px] hover:cursor-pointer`
				})}
			>
				<input id={id}  {...getInputProps()} type="file" {...props}/>
				{src ? (
					<img height={imgHeight} width={imgWidth} src={src} alt="Preview" />
				) : (
					<span className={`${props.error || error ? 'text-error30' : ''} flex items-center gap-[12px]`}>
						<MdOutlineFileDownload size={27}/>
						{error ? error : 'Завантажити зображення'}
					</span>
				)}
			</div>
			{src && (
				<div className={
					`${props.page ? "flex flex-col gap-[20px]" : "flex gap-[12px]"}  w-full items-center justify-end `
				}>
					{openEditer && (
						<button onClick={openEditer} className="w-[36px] h-[36px]" type="button">
							<BiSolidPencil size={24} />
						</button>
					)}
					{removeFile && (
						<button onClick={removeFile} className="w-[36px] h-[36px]" type="button" >
							<BiSolidTrash size={24} />
						</button>
					)}
				</div>

			)}

		</div>
	);
};
