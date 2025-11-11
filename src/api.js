import API_BASE_URL from "./config";

axios.get(`${API_BASE_URL}/api/users`);
axios.post(`${API_BASE_URL}/api/login`, userData);
