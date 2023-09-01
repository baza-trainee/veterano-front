export const useFormatDate = () => {
	const currentDate = new Date();
	const formattedCurrentDate = currentDate.toLocaleDateString("uk-UA", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
	return formattedCurrentDate
}