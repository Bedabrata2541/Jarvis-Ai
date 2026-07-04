import {
  FaLightbulb,
  FaBolt,
  FaFileAlt,
  FaCode
} from "react-icons/fa";

import robot from "../assets/logo.png"; // Your logo

import "../styles/emptyState.css";

function EmptyState({ onPromptClick }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const prompts = [
    {
      icon: <FaLightbulb />,
      title: "Explain React Hooks",
      prompt: "Explain React Hooks with examples suitable for beginners."
    },
    {
      icon: <FaBolt />,
      title: "Build an Express API",
      prompt: "Build a complete Express.js REST API with CRUD operations."
    },
    {
      icon: <FaFileAlt />,
      title: "Summarize this document",
      prompt: "Summarize this document into simple bullet points."
    },
    {
      icon: <FaCode />,
      title: "Write Python Code",
      prompt: "Write clean Python code with explanation."
    }
  ];

  return (
    <div className="empty-state">

      <img src={robot} alt="Jarvis" className="hero-logo" />

      <h1>
        Hello, {user?.name || "User"} 👋
      </h1>

      <p>What can I help you with today?</p>

      <div className="prompt-grid">

        {prompts.map((item, index) => (

          <div
            key={index}
            className="prompt-card"
            onClick={() => onPromptClick(item.prompt)}
          >
            <div className="prompt-icon">
              {item.icon}
            </div>

            <span>{item.title}</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default EmptyState;