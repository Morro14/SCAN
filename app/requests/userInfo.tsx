import axios from "axios";
import { apiURL } from "~/root";
export default async function getUserInfo() {
  const response = await axios
    .get(apiURL + "account/info")
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      console.log(e);
    });

  return response;
}
