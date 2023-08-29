import NavLinkAdmin from "../components/NavLinkAdmin/NavLinkAdmin.tsx";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {
	return (
		<div className={'flex h-[1024px]'}>
			<div className={'w-[272px] bg-yellow50'}>
				<header className={'bg-grey100 h-[118px]'}>
					<div className={'px-[32px] pt-[40px] pb-[38px]'}><img src="/images/logo-white-sm.svg" alt="" /></div>
				</header>
				<div className={'px-[32px] pt-[112px] mb-[120px] flex flex-col gap-[250px]'}>
					<div className={'flex flex-col gap-6'}>
						<NavLinkAdmin icon={"/images/admin/folder.svg"} to={'projects'}>Проєкти</NavLinkAdmin>
						<NavLinkAdmin icon={"/images/admin/case.svg"} to={'partners'}>Партнери</NavLinkAdmin>
						<NavLinkAdmin icon={"/images/admin/contacts.svg"} to={'contacts'}>Контакти</NavLinkAdmin>
						<NavLinkAdmin icon={"/images/admin/file.svg"} to={'documents'}>Документи</NavLinkAdmin>
					</div>

					<button
						className={'w-full flex py-3 px-4 gap-3 border border-transparent rounded hover:border hover:border-black bg-inherit'}
					>
						<img src="/images/admin/logout.svg" alt="logout"/>
						Вийти
					</button>
				</div>
			</div>
			<div className={'flex-grow'}>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;