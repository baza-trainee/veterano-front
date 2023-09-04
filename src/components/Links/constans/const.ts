import { sizeClassType } from "../interfaces/Interfaces.ts";

export const sizeClassNames: sizeClassType = {
	small: "h-[36px] leading-[24px] ",
	large: " text-[18px]",
	wideMob: " bg-white text-[18px] w-[288px] ",
};

export const variantClassNames = {
	underlineFooter: " link-style underline decoration-1 underline-offset-[5px] font-light",
	underlineNoneFooter: "link-style font-light",
	underlineSideBar:
		" transition-transform transform hover:delay-200 hover:translate-x-2 text-lg ",
	underlineNoneSideBar: "nav-link-style ",
	primary: {
		active: "primary-btn btn-style bg-black text-white",
		disabled:
			"primary-btn btn-style bg-grey50 text-white shadow-none pointer-events-none",
	},
	secondary: {
		active: "secondary-btn btn-style border border-black  text-black ",
		disabled:
			" secondary-btn btn-style !bg-grey50 text-white shadow-none pointer-events-none ",
	},
	primaryDarkBg: {
		active: "primary-dark-bg btn-style bg-white text-black border border-black",
		disabled:
			"primary-dark-bg btn-style !bg-grey50 text-white shadow-none pointer-events-none",
	},
	secondaryDarkBg: {
		active:
			"secondary-btn btn-style bg-black border border-black text-white hover:cursor-pointer hover:bg-yellow30 hover:text-black ",
		disabled:
			" secondary-btn btn-style !bg-grey50 text-white shadow-none pointer-events-none ",
	},
};
