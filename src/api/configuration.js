import { baseURL } from "@/utils/config";

export async function fetchConfig() {
	const res = await fetch(`${baseURL}/api/config`);
	const config = res.json();
	return config;
}