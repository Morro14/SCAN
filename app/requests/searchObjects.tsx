import axios from "axios";
import type { HistogramsRequestParams } from "~/entities/entities";
import { apiURL } from "~/root";

export default async function getSearchObjects(data: HistogramsRequestParams) {
  const response = await axios
    .post(apiURL + "objectsearch", data)
    .then((r) => {
      console.log(r);
      return r;
    })
    .catch((r) => {
      console.log(r);
      return r;
    });
  return response;
}
