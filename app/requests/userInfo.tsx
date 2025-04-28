import axios from "axios";
import { apiURL } from "~/root";

export default async function getUserInfo() {
	const response = await axios
		.get(apiURL + "account/info")
		.then((r) => {
			if (r.status === 200) {
				console.log(r);
				return r.data;
			}
		})
		.catch((e) => {
			throw new Response("Bad Request", {
				status: 404,
				statusText: e.response.statusText,
			});
			console.log(e);
			return null;
		});

	return response;
}
