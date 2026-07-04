import { useState, useRef } from "react";
import { FaPaperclip, FaMicrophone, FaPaperPlane, FaChevronDown } from "react-icons/fa";
import "../styles/input.css";

function ChatInput({
    onSend,
    selectedModel,
    setSelectedModel
}) {
  const [message, setMessage] = useState("");
const [selectedFile, setSelectedFile] = useState(null);
const [isListening, setIsListening] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const fileInputRef = useRef(null);
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = SpeechRecognition
    ? new SpeechRecognition()
    : null;

if (recognition) {

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

}
  const handleSend = () => {
    if (message.trim() === "") return;

    onSend(message);

    setMessage("");
  };

  const startListening = () => {

    if (!recognition) {

        alert("Speech Recognition is not supported in this browser.");

        return;

    }

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {

        const transcript = event.results[0][0].transcript;

        setMessage(transcript);

        setIsListening(false);

    };

    recognition.onerror = () => {

        setIsListening(false);

    };

    recognition.onend = () => {

        setIsListening(false);

    };

};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">

  <div className="model-menu">

    <button
      className="model-button"
      type="button"
      onClick={() => setShowModels(!showModels)}
    >

      {selectedModel === "qwen2.5:1.5b" && "🟢 Qwen 2.5"}
      {selectedModel === "gemini" && "✨ Gemini 2.5"}
      {selectedModel === "sarvam" && "☁️ Sarvam AI"}

      <FaChevronDown />

    </button>

    {showModels && (

      <div className="model-dropdown">

        <div
    className="model-item"
    onClick={() => {
        setSelectedModel("qwen2.5:1.5b");
        setShowModels(false);
    }}
>
    <div className="model-name">🟢 Qwen 2.5</div>
    <div className="model-desc">Local • Offline • Private</div>
</div>

<div
    className="model-item"
    onClick={() => {
        setSelectedModel("gemini");
        setShowModels(false);
    }}
>
    <div className="model-name">✨ Gemini 2.5 Flash</div>
    <div className="model-desc">Cloud • Fast • Free</div>
</div>

<div
    className="model-item"
    onClick={() => {
        setSelectedModel("sarvam");
        setShowModels(false);
    }}
>
    <div className="model-name">🇮🇳 Sarvam AI</div>
    <div className="model-desc">Cloud • Indian Languages</div>
</div>

      </div>

    )}

  </div>

  <>
    <button
        className="icon-btn"
        onClick={() => fileInputRef.current.click()}
    >
        <FaPaperclip />
    </button>

    <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*,.pdf,.txt,.doc,.docx"
        onChange={(e) => {

            if (e.target.files.length > 0) {

                setSelectedFile(e.target.files[0]);

            }

        }}
    />
</>

{selectedFile && (

    <div className="selected-file">

        <span>
            📎 {selectedFile.name}
        </span>

        <button
            className="remove-file-btn"
            onClick={() => {

                setSelectedFile(null);

                fileInputRef.current.value = "";

            }}
        >
            ✖
        </button>

    </div>

)}

      <textarea
        placeholder="Ask Jarvis anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows="1"
      />

      <button
    className="icon-btn"
    onClick={startListening}
>

    {isListening ? "🔴" : <FaMicrophone />}

</button>

      <button className="send-btn" onClick={handleSend}>
        <FaPaperPlane />
      </button>

    </div>
  );
}

export default ChatInput;