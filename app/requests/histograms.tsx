import axios from "axios";
import { apiURL } from "~/root";
import type { HistogramsRequestParams } from "~/entities/entities";

export default async function getHistograms(data: HistogramsRequestParams) {
  const response = await axios
    .post(apiURL + "objectsearch/histograms", data)
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
