import axios from "axios";

const API = axios.create({
  baseURL: "https://jarvis-ai-whyd.onrender.com/api/auth",
});

export default API;