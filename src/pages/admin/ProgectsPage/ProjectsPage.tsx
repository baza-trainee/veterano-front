import Typography from "../../../components/Typography/Typography.tsx";
import SearchBar from "../../../components/SearchBar/SearchBar.tsx";
import NavigationLink from "../../../components/Links/NavigationLink.tsx";
import { useState } from "react";

const ProjectsPage = () => {
	const [value, setValue] = useState('')

	return (
		<>
			<div className={'bg-grey100'}>
				<div className={'px-[36px] pt-[38px] pb-[38px] h-[118px] flex justify-between'}>
					<Typography variant={'h3'} component={'h3'} className={'text-white'}>Проєкти</Typography>
					<div className={'flex gap-16'}>
						<SearchBar
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder={'Введіть ключове слово для пошуку'}
							disabled={false}
							className={'md:w-[280px] lg:w-[400px]'}
						/>
						<NavigationLink to={'new-project'} variant={'primaryDarkBg'} size={'large'}>Додати</NavigationLink>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProjectsPage;