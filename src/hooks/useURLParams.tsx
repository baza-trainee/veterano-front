import { useEffect, useState } from "react";

export const useURLParams = (params: string) => {
	const [paramsValue, setParamsValue] = useState<string | null>('');
	const searchParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		setParamsValue(searchParams.get(params));
	}, [searchParams]);

	return paramsValue

}