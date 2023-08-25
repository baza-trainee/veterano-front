import AdminInput from "../../components/AdminPanel/Input/AdminInput";
import ImageInput from "../../components/ImageCroper/ImageInput";

const AddPartnerPage = () => {
	return (
		<div className="flex gap-[24px] flex-col">
			<AdminInput value={"1231"} placeholder={""} name={"login"} />
			<AdminInput value={"12312"} placeholder={""} name={""} />
			<ImageInput className="bg-[white]" />
		</div>
	);
};
export default AddPartnerPage;
