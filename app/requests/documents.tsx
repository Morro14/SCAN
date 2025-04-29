import axios from "axios";
import { apiURL } from "~/root";

export default async function getDocuments(data: any) {
	const response = await axios
		.post(apiURL + "documents", data)
		.then((r) => {
			console.log(r);
			return r;
		})
		.catch((e) => {
			console.log(e);
			return e;
		});
	return response;
}
