import Typography from "../../../components/Typography/Typography.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { Formik } from "formik";
import { boolean } from "yup";


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

					{({values, setFieldValue, submitForm, handleChange}) => {
						<div>


						</div>
					}}
				</Formik>
			</div>

		</>
	);
};

export default AddProjectPage;