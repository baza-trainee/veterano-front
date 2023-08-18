import { $host } from "./index.ts";

interface SubscriptionType{
	name: string,
	email: string,
}
export const createSubscription = async ({name, email}: SubscriptionType) => {
	try{
		const {data} = await $host.post('subscription/subscribe', {
			name,
			email
		})
		return [data]
	} catch (e) {
		console.error('Error creating feedback:', e);
		return null;
	}
}