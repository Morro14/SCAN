import axios from "axios";
import { apiURL } from "~/root";

export default async function loginReq(username: string, password: string) {
	const data = { login: username, password: password };
	const response = await axios
		.post(apiURL + "account/login", data)
		.then((r) => {
			console.log(r);
			return r;
		})
		.catch((e) => {
			console.log("error", e);
			return e;
		});
	return response;
}
