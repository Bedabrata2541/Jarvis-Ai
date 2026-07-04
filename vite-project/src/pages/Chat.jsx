import ChatAPI from "../api/chat";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import EmptyState from "../components/EmptyState";
import MessageBubble from "../components/MessageBubble";

import "../styles/chat.css";

function Chat() {

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([
  {
    id: 1,
    title: "Welcome Chat",
    messages: []
  }
]);

const [currentChatId, setCurrentChatId] = useState(1);
  const [selectedModel, setSelectedModel] = useState(
    localStorage.getItem("defaultModel") || "gemini"
);

  const sendMessage = async (text) => {

    // Show user's message immediately
    const userMessage = {
        sender: "user",
        text
    };

    // If this is the first message, rename the chat
if (messages.length === 0) {

    setChats(prevChats =>
        prevChats.map(chat =>
            chat.id === currentChatId
                ? {
                    ...chat,
                    title: text.length > 30
                        ? text.substring(0, 30) + "..."
                        : text
                }
                : chat
        )
    );

}

    setMessages(prev => {

    const updatedMessages = [...prev, userMessage];

    setChats(prevChats =>
        prevChats.map(chat =>
            chat.id === currentChatId
                ? { ...chat, messages: updatedMessages }
                : chat
        )
    );

    return updatedMessages;

});

    try {

        // Send message to backend
        const response = await ChatAPI.post("/", {
            message: text,
            model: selectedModel
        });

        // Create AI response
        const aiMessage = {
            sender: "ai",
            text: response.data.reply
        };

        // Display AI response
        setMessages(prev => {

    const updatedMessages = [...prev, aiMessage];

    setChats(prevChats =>
        prevChats.map(chat =>
            chat.id === currentChatId
                ? { ...chat, messages: updatedMessages }
                : chat
        )
    );

    return updatedMessages;

});

    }
    
    catch(error){

        console.error(error);

        const aiMessage = {

            sender:"ai",

            text:"Something went wrong."

        };

        setMessages(prev=>[...prev, aiMessage]);

    }

};

  return (

    <div className="chat-page">

      <Sidebar chats={chats}
        setChats={setChats}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        setMessages={setMessages}    
      />

      <div className="chat-main">

        <ChatHeader
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        <div className="chat-body">

          {messages.length === 0 ? (

           <EmptyState onPromptClick={sendMessage} />

          ) : (

            <div className="messages">

              {messages.map((msg, index) => (

                <MessageBubble
                  key={index}
                  sender={msg.sender}
                  text={msg.text}
                />

              ))}

            </div>

          )}

        </div>

        <ChatInput
            onSend={sendMessage}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
        />

      </div>

    </div>

  );

}

export default Chat;