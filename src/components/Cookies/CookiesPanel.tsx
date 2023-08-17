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
				className="fixed bottom-0 left-0 right-0 bg-[#F9F6EC] py-8 px-4 h-[320px] shadow-md flex flex-col justify-center gap-6 flex-shrink-0 md:flex-row md:justify-between md:items-center text-sm">
					<div className={'flex justify-end'}>
						<img src="/images/close.svg" alt="close" />
					</div>
					<p className="text-[16px] leading-6">
						Цей сайт використовує файли cookies для правильної роботи і покращення сервісу. Якщо ви погоджуєтесь з їхнім
						використанням, натисніть ОК. Більше інформації в <Link to={'/ddddd'} variant={'underlineFooter'} style={{color: 'black'}}>Політика конфіденційності</Link>.
					</p>

				<div className="w-full flex justify-center">
					<Button id="accept-cookies" variant={'primary'} size={'large'} onClick={acceptCookies}>OK</Button>

				</div>
			</div>
		)
	);
};

export default CookiesPanel;