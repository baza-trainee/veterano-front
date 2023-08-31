import Typography from "../../../components/Typography/Typography.tsx";
import IconClose from "../../../components/AdminPanel/IconButtons/IconClose.tsx";
import { NavLink} from "react-router-dom";
import ProjectsForm from "../../../components/AdminPanel/Projects/ProjectsForm.tsx";

const AddProjectPage = () => {

	return (
		<>
			<div className={"bg-grey100 "}>
				<div className={"px-[36px] pt-[38px] pb-[38px] pr-[80px] h-[118px] flex justify-between"}>
					<Typography variant={"h3"} component={"h3"} className={"text-white"}>Проєкти</Typography>
					<NavLink to={"/admin/projects/"}><IconClose /></NavLink>
				</div>
			</div>
			<div className={"pt-[48px] pl-[34px] pr-[80px] pb-[128px] bg-grey30 min-h-[100vh]"}>
				<Typography variant={"h4"} component={"h4"} className={"text-black mb-[36px]"}>Додати проєкт</Typography>
				<ProjectsForm type={"add"}/>
			</div>
		</>
	)
		;
};

export default AddProjectPage;