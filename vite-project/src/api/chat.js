import axios from "axios";

const ChatAPI = axios.create({
  baseURL: "http://localhost:5000/api/chat",
});

export default ChatAPI;