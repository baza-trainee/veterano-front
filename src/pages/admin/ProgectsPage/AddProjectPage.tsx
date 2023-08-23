import Typography from "../../../components/Typography/Typography.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { Form, Formik } from "formik";

const AddProjectPage = () => {
	return (
		<>
			<div className={"bg-grey100 "}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>Проєкти</Typography>
					<IconClose/>
				</div>
			</div>
			<div className={"pt-[48px] pl-[34px] pr-[80px] pb-[128px] bg-grey30 h-[100vh]"}>
				<Typography variant={"h4"} component={"h4"} className={"text-black"}>Додати проєкт</Typography>
				<Formik
					initialValues={{
						title: "",
						url: "",
						description: "",
						city: "",
						country: "",
						image: "",
						isEnabled: true,
						publication: "",
						category: ""
					}}
					onSubmit={values => {
						console.log(values)
					}}>

					{({ values, setFieldValue, submitForm, handleChange, handleSubmit }) => (
						<Form>
							<div className="grid grid-cols-2 gap-[20px]">
								<div className="col-span-1 gap-[22px]">
									<div className="row-span-1">Перша колонка, 1 рядок</div>
									<div className="row-span-1">Перша колонка, 2 рядок</div>
									<div className="row-span-1">Перша колонка, 3 рядок</div>
								</div>
								<div className="col-span-1 ">
									<div className="row-span-1">Друга колонка, 1 рядок</div>
									<div className="row-span-1">Друга колонка, 2 рядок</div>
									<div className="grid grid-rows-2">
										<div className="row-span-1">Друга колонка, 3 рядок, 1 частина</div>
										<div className="row-span-1">Друга колонка, 3 рядок, 2 частина</div>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>

		</>
	);
};

export default AddProjectPage;