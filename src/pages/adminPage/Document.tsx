import { useState } from "react";
import { AdminHeader } from "../../components/AdminHeader";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { AdminInputFile } from "../../components/AdminPanel/Input/AdminInputFile";

export const DocumentPage = () => {
	const [, setSelectedFile] = useState<File | null>(null);

	const handleFileSelect = (file: File | null) => {
		setSelectedFile(file);
	};
	return (
		<div>
			<AdminHeader name="Документи" />
			<div className="pl-9 pr-[80px] pt-12 ">
				<div className="flex justify-between mb-[18px]">
					<Typography variant="h2" className="font-medium text-2xl">
						Додати документ
					</Typography>
					<Button variant="primary">Опублікувати</Button>
				</div>

				<div className="flex flex-col gap-4 max-w-[739px]">
					<AdminInputFile
						placeholder="Політика конфіденційності"
						name="privacy"
						onSelect={handleFileSelect}
					>
						<p className="text-base leading-4">Політика конфіденційності</p>
					</AdminInputFile>
					<AdminInputFile
						placeholder="Правила користування сайтом"
						name="rules"
						onSelect={handleFileSelect}
					>
						<p className="text-base leading-4 text-grey50">
							Правила користування сайтом
						</p>
					</AdminInputFile>
					<AdminInputFile
						placeholder="Додати документ"
						name="addDoc"
						onSelect={handleFileSelect}
					>
						<p className="text-base leading-4 text-grey50">Додати документ</p>
					</AdminInputFile>
					<div className="bg-white w-9 h-9 rounded-md flex justify-center items-center">
						<img src="/images/admin/add.svg" className="hover:cursor-pointer" />
					</div>
				</div>
			</div>
		</div>
	);
};
