import NavLinkAdmin from "../components/NavLinkAdmin/NavLinkAdmin.tsx";


const AdminLayout = () => {
	return (
		<div className={'w-[272px] '}>
			<header className={'bg-grey100'}>
				<div className={'px-[32px] pt-[40px] pb-[38px]'}><img src="/images/logo-white-sm.svg" alt="" /></div>
			</header>
			<div className={'px-[32px] bg-yellow50 h-[100vh] flex flex-col gap-6'}>
				<NavLinkAdmin icon={"/images/admin/folder.svg"} to={'/projects'}>Проєкти</NavLinkAdmin>
				<NavLinkAdmin icon={"/images/admin/case.svg"} to={'/partners'}>Партнери</NavLinkAdmin>
				<NavLinkAdmin icon={"/images/admin/contacts.svg"} to={'/contacts'}>Контакти</NavLinkAdmin>
				<NavLinkAdmin icon={"/images/admin/file.svg"} to={'/documents'}>Документи</NavLinkAdmin>
			</div>
		</div>
	);
};

export default AdminLayout;