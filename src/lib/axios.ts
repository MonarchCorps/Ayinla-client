import { CONFIGS } from "@/config";
import axios from "axios";

const baseURL: string = CONFIGS.URL.API_BASE_URL;

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: false,
});
