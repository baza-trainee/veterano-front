import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "../Links/Link.tsx";
import Button from "../Button/Button.tsx";


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
				className="fixed bottom-0 left-0 right-0 bg-[#F9F6EC] py-8 px-4 flex flex-col justify-center gap-6 md:px-6 md:py-6 lg:px-[80px] lg:py-4 md:gap-9 lg:flex-row lg:justify-between lg:w-[1440px] lg:items-center  ">
					<div className={'flex justify-end flex-shrink-0 lg:order-3'}>
						<img src="/images/close.svg" alt="close" />
					</div>
					<p className="text-[16px] leading-6 lg:order-1 lg:min-w-[845px]">
						Цей сайт використовує файли cookies для правильної роботи і покращення сервісу. Якщо ви погоджуєтесь з їхнім
						використанням, натисніть ОК. Більше інформації в <Link to={'/ddddd'} variant={'underlineFooter'} style={{color: 'black'}}>Політика конфіденційності</Link>.
					</p>
				<div className="w-full flex justify-center md:w-[95px] lg:w-[93px] lg:order-2">
					<Button id="accept-cookies" variant={'primary'} size={'large'} onClick={acceptCookies}>OK</Button>
				</div>
			</div>
		)
	);
};

export default CookiesPanel;