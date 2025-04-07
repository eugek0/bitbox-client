import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

export const appAxios = axios.create();
appAxios.defaults.baseURL = SERVER_BASE_URL;
