import axios from "axios";

const api = axios.create({
  baseURL: "https://hostelmate-website.onrender.com",
});

export default api;