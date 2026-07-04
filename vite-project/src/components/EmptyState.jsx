import "../styles/message.css";
import {
  FaCode,
  FaFileAlt,
  FaLightbulb,
  FaBolt,
} from "react-icons/fa";

function EmptyState() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="empty-state">

      <div className="ai-logo">
        🤖
      </div>

      <h1>
        Hello, {user?.name || "User"} 👋
      </h1>

      <p>
        What can I help you with today?
      </p>

      <div className="suggestion-grid">

        <div className="suggestion-card">
          <FaLightbulb />
          <span>Explain React Hooks</span>
        </div>

        <div className="suggestion-card">
          <FaBolt />
          <span>Build an Express API</span>
        </div>

        <div className="suggestion-card">
          <FaFileAlt />
          <span>Summarize this document</span>
        </div>

        <div className="suggestion-card">
          <FaCode />
          <span>Write Python Code</span>
        </div>

      </div>

    </div>
  );
}

export default EmptyState;