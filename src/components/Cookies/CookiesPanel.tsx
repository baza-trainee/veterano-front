import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "../Links/Link.tsx";
import Button from "../Button/Button.tsx";
import CloseBtn from "../CloseBtn/CloseBtn.tsx";

const CookiesPanel = () => {
	const [showPanel, setShowPanel] = useState(false);

	useEffect(() => {
		if (!Cookies.get("cookiesAccepted")) {
			setShowPanel(true);
		}
	}, []);

	const acceptCookies = () => {
		setShowPanel(false);
		Cookies.set("cookiesAccepted", "true", { expires: 365 });
	};

	return (
		showPanel && (
			<div
				id="cookie-panel"
				className="fixed bottom-0 left-0 right-0 bg-[#F9F6EC] justify-between py-8 px-4 flex flex-col gap-6 md:h-[166px] md:flex-row md:gap-[36px] md:px-6 md:py-6 md:items-center lg:px-[80px] lg:h-[104px] lg:py-4 lg:gap-[72px] lg:min-w-[1440px]   "
			>
				<div className={"flex justify-end flex-shrink-0 md:order-3"}>
					<CloseBtn onClick={() => setShowPanel(!showPanel)} />
				</div>

				<p className="text-[16px] leading-6 font-light md:min-w-[457px] md:order-1 lg:min-w-[845px]">
					Цей сайт використовує файли cookies для правильної роботи і покращення
					сервісу. Якщо ви погоджуєтесь з їхнім використанням, натисніть ОК.
					Більше інформації в{" "}
					<Link
						to={"/privacy"}
						variant={"underlineFooter"}
						style={{ color: "black" }}
					>
						Політика конфіденційності
					</Link>
					.
				</p>
				<div className="w-full flex justify-center md:w-[95px] flex-shrink-0 lg:w-[93px] md:order-2">
					<Button
						id="accept-cookies"
						variant={"primary"}
						size={"large"}
						onClick={acceptCookies}
						className={"py-[10px] h-[48px] text-[18px] leading-[28px]"}
					>
						OK
					</Button>
				</div>
			</div>
		)
	);
};

export default CookiesPanel;
