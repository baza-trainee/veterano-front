import Typography from "../../../components/Typography/Typography.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { createCard } from "../../../api/CardsApi.ts";
import { validationSchema } from "./validationShema.ts";
import { useFormatDate } from "../../../hooks/useFormatDate.tsx";
import ProjectForm from "../../../components/AdminPanel/Projects/ProjectForm.tsx";

const AddProjectPage = () => {

	const formatDate = useFormatDate();


	return (
		<>
			<div className={"bg-grey100 "}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>Проєкти</Typography>
					<NavLink to={'/admin/projects/'}><IconClose /></NavLink>

				</div>
			</div>
			<div className={"pt-[48px] pl-[34px] pr-[80px] pb-[128px] bg-grey30 h-[100vh]"}>
				<Typography variant={"h4"} component={"h4"} className={"text-black mb-5"}>Додати проєкт</Typography>
				<Formik
					initialValues={{
						title: "",
						url: "",
						description: "",
						city: "",
						country: "",
						image: "",
						isEnabled: true,
						publication: formatDate,
						category: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const { isEnabled, city, country, category, ...rest } = values;
						const location = { city, country };
						const categories = [{ categoryName: category }];
						const cardData = { ...rest, location, categories };
						console.log(cardData);
						createCard(cardData);
					}}

				>

					{({ values, setFieldValue, errors, handleChange, handleSubmit }) => (
						<ProjectForm
							values={values}
							errors={errors}
							setFieldValue={setFieldValue}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>
					)}
				</Formik>
			</div>

		</>
	);
};

export default AddProjectPage;