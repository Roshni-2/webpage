import API_BASE_URL from "./config";
import axios from "axios";

const API = {
  login: (data) => axios.post(`${API_BASE_URL}/api/login`, data),
  register: (data) => axios.post(`${API_BASE_URL}/api/users`, data),
};

export default API;
