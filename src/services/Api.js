import axios from "axios";

export default () => {
  const TRANSFER_PROTOCOL = import.meta.env.VITE_API_TRANSFER_PROTOCOL;
  const BASE = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_PROJECT_TOKEN;
  return axios.create({
    baseURL: `${TRANSFER_PROTOCOL}://${TOKEN}.${BASE}`,
    headers: { "content-type": "application/json" },
  });
};
