import axios from "axios";

const ChatAPI = axios.create({
  baseURL: "https://jarvis-ai-whyd.onrender.com/api/chat",
});

export default ChatAPI;