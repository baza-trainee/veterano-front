import AdminInput from "../Input/AdminInput.tsx";
import CitiesDropDown from "../DropwDown/CitiesDropDown.tsx";
import { capitalizeFirstLetter } from "../../../../utils/functions/functions.ts";
import CategoryDropDown from "../DropwDown/CategoryDropDown.tsx";
import ImageInput from "../../ImageCroper/ImageInput.tsx";
import Switch from "../../Switch/Switch.tsx";
import Button from "../../Button/Button.tsx";
import CustomCalendar from "../Calendar/CustomCalendar.tsx";
import { Form, FormikErrors } from "formik";
import { FC, useState } from "react";
import { useFormatDate } from "../../../hooks/useFormatDate.tsx";
interface FormValues {
	title?: string;
	url?: string;
	description?: string;
	city?: string;
	country?: string;
	image?: string;
	isEnabled?: boolean;
	publication?: string;
	category?: string;
}
interface ProjectFormProps {
	values: FormValues;
	errors: FormikErrors<FormValues>;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	handleChange: (e: React.ChangeEvent<any>) => void;
	handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}
const ProjectForm: FC<ProjectFormProps> = ({ values, setFieldValue, errors, handleChange, handleSubmit }) => {
	const [isOpen, setIsOpen] = useState(false);
	const formatDate = useFormatDate();

	return (
		<Form onSubmit={handleSubmit}>
			<div className="flex gap-[20px]">
				<div className="flex flex-col w-2/3">
					<div className="mb-[22px]">
						<AdminInput
							type={"text"}
							value={values.title || ""}
							placeholder={"Додати назву проекту"}
							name={"title"}
							onChange={handleChange}
							error={errors.title as string} />
					</div>
					<div className="mb-[22px]">
						<AdminInput
							type={"text"}
							value={values.url || ""}
							placeholder={"Додати посилання"}
							name={"url"}
							onChange={handleChange}
							error={errors.url as string} />
					</div>
					<div>
										<textarea
											name={"description"}
											value={values.description || ""}
											onChange={handleChange}
											className={`resize-none pt-[10px] pl-[10px] pr-[53px] w-full h-[548px] border rounded ${errors.description ? "placeholder:text-error30" : "placeholder:text-grey50"} placeholder:text-[14px] `}
											placeholder={errors.description ? errors.description as string : "Введіть текст тут"}
										/>
					</div>
				</div>
				<div className="flex flex-col w-1/3">
					<div className="mb-[22px]">

						<CitiesDropDown
							inputDisplayValue={`${capitalizeFirstLetter(values.city || '') }/${capitalizeFirstLetter(values.country|| '') }`}
							value={values.city || ""}
							name={"city"}
							onChange={handleChange}
							placeholder={"Місто / країна"}
							onValueSelected={({ city, country }) => {
								setFieldValue("city", city);
								setFieldValue("country", country);
							}}
							error={errors.city as string || errors.country as string} />
					</div>
					<div className="mb-[22px]">
						<CategoryDropDown
							value={values.category || ""}
							name={"category"}
							onChange={e => {
								handleChange(e);
							}}
							placeholder={"Категорія"}
							onValueSelected={(category) => {
								setFieldValue("category", category);
							}}
							error={errors.city as string}
						/>
					</div>
					<div className="flex flex-col">
						<div className="mb-[22px] bg-white rounded">
							<ImageInput
								initialImage={values.image}
								onSelectedImg={(preview) => setFieldValue("image", preview)}
							/>
						</div>
						<div className="h-[226px] bg-white py-6 px-[74px] relative">
							<div className={" h-full flex flex-col justify-between"}>
								<div className={"flex flex-col"}>
									<div className={"flex items-center mb-4 text-[14px]"}>
										Стан: <span
										className={"block underline ml-4 w-[100px]"}>{values.isEnabled ? "активний" : "неактивний"}</span>
										<Switch
											isChecked={values.isEnabled || false}
											setIsChecked={(isChecked) => setFieldValue("isEnabled", isChecked)}
										/>
									</div>

									<div className={"flex items-center text-[14px] relative"}>
										Дата публікації:
										<button onClick={() => setIsOpen(!isOpen)} className={"underline cursor-pointer p-2"}>
											{values.publication}
										</button>
									</div>
								</div>
								<Button variant={"primary"} size={"large"} type={"submit"}>Опублікувати</Button>
							</div>
							{isOpen &&
								<CustomCalendar
									setIsOpen={setIsOpen}
									onValueSelected={(date) => {
										if (date) {
											setFieldValue("publication", date);
										} else {
											setFieldValue("publication", formatDate);
										}
									}}
								/>}
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default ProjectForm;