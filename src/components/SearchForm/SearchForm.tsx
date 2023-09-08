import SearchBar from "../SearchBar/SearchBar";
import DropDown from "../DropDown/DropDown";
import FilterButton from "../FilterButton/FilterButton";
import { Form, Formik, FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCategoryList, getCitiesList } from "../../api/SearchAPI.tsx";
import React from "react";
import { capitalizeFirstLetter } from "../../../utils/functions/functions.ts";
import { useMedia } from "../../hooks/useMedia.tsx";

interface CategoryType {
	categoryName: string;
}

export interface LocationType {
	city: string;
	country: string;
}

const HeroSearchBar = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [cities, setCities] = useState<LocationType[]>([]);
	const [onClickCategory, setOnClickCategory] = useState<string | null>(null);
	const { isMobile } = useMedia();
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [triedToSubmit, setTriedToSubmit] = useState(false);
	const [page, setPage] = useState('')

	const location = useLocation();


	useEffect(() => {
		const currentUrl = location.pathname;
		console.log(currentUrl);

		if(currentUrl.includes('/search')) {
			setPage('search')
		}


	}, [location])

	useEffect(() => {
		getCategoryList().then((data) => {
			if (data !== null) {
				setCategories(data);
			}
		});
		getCitiesList().then((data) => {
			if (data !== null) {
				setCities(data);
			}
		});
		const scrollContainer = scrollContainerRef.current;

		const handleScroll = (event: WheelEvent) => {
			if (!scrollContainer) return;
			event.preventDefault();

			const scrollAmount = event.deltaY;
			scrollContainer.scrollLeft += scrollAmount;
		};

		if (scrollContainer) {
			scrollContainer.addEventListener("wheel", handleScroll);
			return () => {
				scrollContainer.removeEventListener("wheel", handleScroll);
			};
		}
	}, []);


	const handleFilterChange = (
		setFieldValue: (field: string, value: any) => void,
		fieldName: string,
		value: any,
	) => {
		setFieldValue(fieldName, value);
		setTriedToSubmit(false);
	};

	const handleFormSubmit = (
		values: { search: string; city: string; country: string; category: string },
		{ setFieldError }: FormikHelpers<typeof values>,
	) => {

		if (!values.search && triedToSubmit) {
			setFieldError("search", "Search is empty");
			return;
		}
		const queryParams = new URLSearchParams();

		if (values.search) queryParams.append("q", values.search.toString());
		if (values.city) queryParams.append("city", values.city);
		if (values.country) queryParams.append("country", values.country);
		if (values.category) queryParams.append("category", values.category);
		queryParams.append("page", "1");

		if (queryParams.toString()) {
			navigate(`/search?${queryParams}`);
		}
	};

	return (
		<Formik
			initialValues={{ search: "", city: "", country: "", category: "Всі" }}
			onSubmit={handleFormSubmit}
		>
			{({ values, errors, setFieldValue, handleChange, handleSubmit }) => (
				<Form className={"md:w-[720px]"}>
					<div
						className={
							"md:flex md:mb-[10px] md:gap-[20px] md:w-full lg:mb-[18px]"
						}
					>
						<div className={"md:w-[350px] lg:w-[413px]"}>
							<SearchBar
								id={"search"}
								name={"search"}
								value={values.search}
								onChange={handleChange}
								onSubmit={() => setTriedToSubmit(true)}
								placeholder={
									isMobile
										? "Ключове слово для пошуку"
										: "Введіть ключове слово для пошуку"
								}
								disabled={false}
								error={errors.search}
							/>
						</div>
						<div className={"my-6 md:my-0 md:w-[350px] lg:w-[197px]"}>
							<DropDown
								name={"city"}
								cities={cities}
								value={values.city}
								onChange={handleChange}
								onValueSelected={({ city, country }) => {
									setFieldValue("city", city);
									setFieldValue("country", country);
									setTriedToSubmit(false);
									handleSubmit();
								}}
								placeholder={"Країна / місто"}
								page={page}
							/>
						</div>
					</div>
					<div
						ref={scrollContainerRef}
						className={"flex overflow-x-auto gap-4 search-filter lg:w-[630px]"}
					>
						<FilterButton
							id={`filter-всі`}
							label={"Всі"}
							name={"category"}
							value={"Всі"}
							onChange={(e) => {
								handleFilterChange(setFieldValue, "category", e.target.value);
								handleSubmit();
							}}
							checked={values.category === "Всі"}
							className={"whitespace-nowrap"}
						/>
						{categories &&
							categories?.map((category, index) => (
								<React.Fragment key={index}>
									<FilterButton
										id={`filter-${category.categoryName}`}
										label={capitalizeFirstLetter(category.categoryName)}
										name={"category"}
										value={category.categoryName}
										onClick={() => {
											if (onClickCategory === category.categoryName) {
												setFieldValue("category", "Всі");
												setOnClickCategory(null);
												handleSubmit();
											} else {
												setOnClickCategory(category.categoryName);
											}
										}}
										onChange={(e) => {
											handleFilterChange(setFieldValue, "category", e.target.value);
											handleSubmit();
										}}
										checked={values.category === category.categoryName}
										className={"whitespace-nowrap "}
									/>
								</React.Fragment>
							))}
					</div>
				</Form>
			)}
		</Formik>
	);
};
export default HeroSearchBar;
