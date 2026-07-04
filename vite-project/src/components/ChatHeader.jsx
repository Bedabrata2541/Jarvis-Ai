import "../styles/header.css";
import { FaRobot, FaCircle } from "react-icons/fa";

function ChatHeader({
    selectedModel,
    setSelectedModel
}) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="chat-header">
      <div className="header-left">
        <FaRobot className="robot-icon" />

        <div>
          <h3>Jarvis AI</h3>
          <p>
            <FaCircle className="online-dot" />
            Running Locally
          </p>
        </div>
      </div>

      <div className="header-right">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <span>{user?.name}</span>
      </div>
    </header>
  );
}

export default ChatHeader;