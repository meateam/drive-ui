import { baseURL } from "@/utils/config";

export async function fetchConfig() {
	try {
		const res = await fetch(`${baseURL}/api/config`);
		const config = res.json();
		return config;
	} catch (err) {
		throw new Error(err)
	}
}