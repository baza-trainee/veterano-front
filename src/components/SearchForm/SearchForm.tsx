import SearchBar from "../SearchBar/SearchBar";
import DropDown from "../DropDown/DropDown";
import Container from "../Container/Container";
import FilterButton from "../FilterButton/FilterButton";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

//test cities
const cities = ["Полтава", "Лондон", "Париж", "Київ", "Прага"];

const HeroSearchBar = () => {
	const navigate = useNavigate();

	return (

		<Container>
			<Formik
				initialValues={{ search: '', location: '', category: '' }}
				onSubmit={values => {
					const queryParams = new URLSearchParams();

					if (values.search) queryParams.append('q', values.search);
					if (values.location) queryParams.append('location', values.location);
					if (values.category) queryParams.append('category', values.category);

					if (queryParams.toString()) {
						navigate(`/search?${queryParams}`);
					}

				}}>

				{({ values, setFieldValue, submitForm, handleChange, handleSubmit }) => (
					<Form>
						<div className={'md:flex md:mb-[10px] md:gap-[20px] md:w-full lg:mb-[18px]'}>
							<div className={'md:w-[350px] lg:w-[413px]'}>
								<SearchBar
									id={'search'}
									name={'search'}
									value={values.search}
									onChange={handleChange}
									placeholder={'Введіть слово для пошуку'}
									disabled={false}
								/>
							</div>
							<div className={'my-6 md:my-0 md:w-[350px] lg:w-[197px]'}>
								<DropDown
									name={'location'}
									cities={cities}
									value={values.location}
									onChange={handleChange}
									onValueSelected={city => {
										setFieldValue('location', city);
										submitForm();
									}}
									placeholder={'Країна / місто'}
								/>
							</div>
						</div>
						<div className={'flex overflow-x-auto gap-4 search-mob search-filter'}>
							<FilterButton
								id="filret-1"
								label={'Усі'}
								name={'category'}
								value={'Усі'}
								onChange={e => {
									handleChange(e);
									handleSubmit();
								}}
								checked={values.category === 'Усі'}
								className={'whitespace-nowrap '}
							/>
							<FilterButton
								id="filret-2"
								label={'Реабілітація'}
								name={'category'}
								value={'Реабілітація'}
								onChange={e => {
									handleChange(e);
									handleSubmit();
								}}
								checked={values.category === 'Реабілітація'}
								className={'whitespace-nowrap '}
							/>
							<FilterButton
								id="filret-3"
								label={'Навчання'}
								name={'category'}
								value={'Навчання'}
								onChange={e => {
									handleChange(e);
									handleSubmit();
								}}
								checked={values.category === 'Навчання'}
								className={'whitespace-nowrap '}
							/>
							<FilterButton
								id="filret-4"
								label={'Юридичні послуги'}
								name={'category'}
								value={'Юридичні послуги'}
								checked={values.category === 'Юридичні послуги'}
								onChange={e => {
									handleChange(e);
									handleSubmit();
								}}
								className={'whitespace-nowrap '}
							/>
							<FilterButton
								id="filret-5"
								label={'Бізнес-підтримка'}
								name={'category'}
								value={'Бізнес-підтримка'}
								checked={values.category === 'Бізнес-підтримка'}
								onChange={e => {
									handleChange(e);
									handleSubmit();
								}}
								className={'whitespace-nowrap '}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</Container>
	);
};
export default HeroSearchBar;
