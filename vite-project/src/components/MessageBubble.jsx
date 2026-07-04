import { useState } from "react";
import { FaVolumeUp, FaStop } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/message.css";

function MessageBubble({ sender, text }) {

    const [isSpeaking, setIsSpeaking] = useState(false);

    const speakText = () => {

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);

    };

    const stopSpeaking = () => {

        window.speechSynthesis.cancel();
        setIsSpeaking(false);

    };

    return (

        <div className={`message ${sender}`}>

            <div className="bubble">

                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ inline, className, children, ...props }) {

                            const match = /language-(\w+)/.exec(className || "");

                            return !inline && match ? (

                                <SyntaxHighlighter
                                    style={oneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>

                            ) : (

                                <code className={className} {...props}>
                                    {children}
                                </code>

                            );

                        }
                    }}
                >
                    {text}
                </ReactMarkdown>

                {sender === "ai" && (

                    <button
                        className="speak-btn"
                        onClick={isSpeaking ? stopSpeaking : speakText}
                        title={isSpeaking ? "Stop" : "Read Aloud"}
                    >
                        {isSpeaking ? <FaStop /> : <FaVolumeUp />}
                    </button>

                )}

            </div>

        </div>

    );

}

export default MessageBubble;