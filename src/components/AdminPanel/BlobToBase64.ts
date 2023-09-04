
export async function blobUrlToBase64(blobUrl: string): Promise<string> {
	const response = await fetch(blobUrl);
	const blob = await response.blob();

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function() {
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			reject(new Error("Failed to convert blob URL to Base64."));
		};
	});
}

