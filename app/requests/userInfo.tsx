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
      console.log(e);
      return null;
    });

  return response;
}
