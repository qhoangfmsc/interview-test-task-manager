import axios from "axios";

export function requestAxiosGet(url) {
  const response = axios.get(url);
  return response;
}
