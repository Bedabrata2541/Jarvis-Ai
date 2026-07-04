import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/settings.css";

function Settings() {

    const [tab, setTab] = useState("models");
    const navigate = useNavigate();

const [defaultModel, setDefaultModel] = useState(
    localStorage.getItem("defaultModel") || "gemini"
);

const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
);
    return (

        <div className="settings-page">

            <div className="settings-sidebar">

                <h2>Settings</h2>

                <button onClick={() => setTab("general")}>
                    ⚙ General
                </button>

                <button onClick={() => setTab("models")}>
                    🤖 AI Models
                </button>

                <button onClick={() => setTab("appearance")}>
                    🎨 Appearance
                </button>

                <button onClick={() => setTab("chat")}>
                    💬 Chats
                </button>

                <button onClick={() => setTab("account")}>
                    🔒 Account
                </button>

                <button onClick={() => setTab("about")}>
                    ℹ About
                </button>

            </div>

            <div className="settings-content">
                <button
    className="back-btn"
    onClick={() => navigate("/chat")}
>
    ← Back to Chat
</button>

                {tab === "general" && (
                    <h1>General Settings</h1>
                )}

                {tab === "models" && (

    <div>

        <h1>Default AI Model</h1>

        <p>Select the model that will be used for new chats.</p>

        <div className="model-card">

            <label>
                <input
    type="radio"
    name="model"
    checked={defaultModel === "qwen2.5:1.5b"}
    onChange={() => setDefaultModel("qwen2.5:1.5b")}
/>
                🟢 Qwen 2.5 (Local)
            </label>

            <label>
                <input
    type="radio"
    name="model"
    checked={defaultModel === "gemini"}
    onChange={() => setDefaultModel("gemini")}
/>
                ✨ Gemini 2.5 Flash
            </label>

            <label>
                <input
    type="radio"
    name="model"
    checked={defaultModel === "sarvam"}
    onChange={() => setDefaultModel("sarvam")}
/>
                🇮🇳 Sarvam AI
            </label>

        </div>

        <button
    className="save-btn"
    onClick={() => {

        localStorage.setItem("defaultModel", defaultModel);

        alert("✅ Settings saved successfully!");

    }}
>
    Save Changes
</button>
    </div>

)}

               {tab === "appearance" && (

    <div>

        <h1>Appearance</h1>

        <p>Choose your preferred theme.</p>

        <div className="model-card">

            <label>
                <input
    type="radio"
    checked={theme === "dark"}
    onChange={() => setTheme("dark")}
/>
                🌙 Dark Mode
            </label>

            <label>
                <input
    type="radio"
    checked={theme === "light"}
    onChange={() => setTheme("light")}
/>
                ☀️ Light Mode
            </label>

        </div>

        <button
    className="save-btn"
    onClick={() => {

       localStorage.setItem("theme", theme);

document.body.className = theme;

alert("Theme Saved!");
    }}
>
    Save Theme
</button>

    </div>

)}

                {tab === "chat" && (
                    <h1>Chat Settings</h1>
                )}

                {tab === "account" && (
                    <h1>Account</h1>
                )}

                {tab === "about" && (
                    <h1>About Jarvis AI</h1>
                )}

            </div>

        </div>

    );

}

export default Settings;