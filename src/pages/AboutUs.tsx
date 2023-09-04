import { FC } from "react";
import Accordion from "../components/Accordion/Accordion";
import Container from "../components/Container/Container";
import Typography from "../components/Typography/Typography.tsx";
import { useMedia } from "../hooks/useMedia.tsx";

export const AboutUs: FC = () => {
	const { isMobile, isTablet } = useMedia();
	const accordionData = [
		{
			title: "Як працює агрегатор ветеранських ініціатив?",
			content:
				"Агрегатор - це платформа, де сконцентровано інформацію про державні і громадські ініціативи для ветеранів війни з Росією. Ініціативи формуються, починаючи з 2023 року і стосуються різних сфер громадського життя. Ви можете відсортувати проєкти за потрібною тематикою, а також за містом або країною виконання.",
			customProp: "Custom Property Value 1",
		},
		{
			title: "Які ініціативи і проєкти доступні ветерану?",
			content:
				"Державні, громадські, приватні - все те, що стосується післявоєнного життя ветерана. Тематика проєктів - від реабілітації до юридичної підтримки спільноти. Ми прагнемо максимально сприяти поверненню героїв до мирного життя.",
			customProp: "Custom Property Value 2",
		},
		{
			title: "Наскільки актуальні проєкти, вказані на платформі?",
			content:
				"Тут вказано як актуальні, так і ті проєкти, що закінчились на даний час. Вони можуть бути запущені ще раз, тому варто підписатись на розсилку новин, щоб не пропустити оновлення",
			customProp: "Custom Property Value 3",
		},
		{
			title: "Чи є для мене проєкт, якщо я - член родини ветерана?",
			content:
				"Так, звісно. Ми підтримуємо всіх, хто тримав і тримає стрій. Проєкти бувають дуже різні. Сподіваємось, ви знайдете необхідну інформацію.",
			customProp: "Custom Property Value 3",
		},
		{
			title: "Я хочу додати проєкт до платформи. Що я маю для цього зробити?",
			content:
				"Написати нам на електронну пошту info@baza-trainee.tech або зателефонувати за вказаними на сайті номерами. Дякуємо за вашу активність!",
			customProp: "Custom Property Value 3",
		},
	];

	return (
		<>
			<div
				style={{
					backgroundImage: isMobile
						? "url(/images/about-sm.jpeg)"
						: isTablet
						? "url(/images/about-md.jpeg)"
						: "url(/images/about-lg.jpeg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Container
					className={
						"min-w-[230px] h-[240px] lg:h-[290px] flex flex-col justify-end "
					}
				>
					<Typography
						variant={"h1"}
						component={"h1"}
						className={"text-white w-[209px] mb-7 md:w-full  "}
					>
						Про нас
					</Typography>
				</Container>
			</div>
			<Container className="p-4 mb-20 mx-auto">
				<div className="lg:max-w-[1124px]">
					<Accordion data={accordionData} />
				</div>
			</Container>
		</>
	);
};
