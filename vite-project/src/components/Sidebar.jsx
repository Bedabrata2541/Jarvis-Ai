import {
  FaPlus,
  FaCog,
  FaSignOutAlt,
  FaComments,
  FaTrash
} from "react-icons/fa";

import Logo from "./Logo";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar({
    chats,
    setChats,
    currentChatId,
    setCurrentChatId,
    setMessages
}) {
  const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const handleLogout = () => {

    const confirmLogout = window.confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // Remove stored login details
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Stop any voice that is speaking
    window.speechSynthesis.cancel();

    // Go back to Login Page
    navigate("/");

};
  return (
    <aside className="sidebar">

      <Logo />

      <button
    className="new-chat-btn"
    onClick={() => {

        const newChat = {

            id: Date.now(),

            title: "New Chat",

            messages: []

        };

        setChats([...chats, newChat]);

        setCurrentChatId(newChat.id);

        setMessages([]);

    }}
>
        <FaPlus />
        <span>New Chat</span>
      </button>

      <div className="sidebar-section">

        <h3>Recent Chats</h3>

       {chats.map((chat) => (

    <div
        key={chat.id}
        className={`chat-item ${currentChatId === chat.id ? "active-chat" : ""}`}
    >

        <div
            className="chat-info"
            onClick={() => {

                setCurrentChatId(chat.id);
                setMessages(chat.messages);

            }}
        >

            <FaComments />

            <span>{chat.title}</span>

        </div>

        <button
            className="delete-chat-btn"
            onClick={(e) => {

                e.stopPropagation();

                const confirmDelete = window.confirm(
                    `Delete "${chat.title}"?`
                );

                if (!confirmDelete) return;

                const updatedChats = chats.filter(
                    c => c.id !== chat.id
                );

                setChats(updatedChats);

                if (currentChatId === chat.id) {

                    if (updatedChats.length > 0) {

                        setCurrentChatId(updatedChats[0].id);
                        setMessages(updatedChats[0].messages);

                    } else {

                        setCurrentChatId(null);
                        setMessages([]);

                    }

                }

            }}
        >

            <FaTrash />

        </button>

    </div>

))}

      </div>

      <div className="sidebar-footer">

        <button
    className="sidebar-btn"
    onClick={() => navigate("/settings")}
>
    <FaCog />
    Settings
</button>

       <button
    className="sidebar-btn logout-btn"
    onClick={handleLogout}
>
    <FaSignOutAlt />
    Logout
</button>

        <div className="user-info">
          👤 {user?.name || "Guest"}
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;