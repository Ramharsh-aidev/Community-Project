import React, { useState } from "react";
import ChatInput from "../components/layout/ChatInput";
import Message from "../components/ui/Message";
import { generateContent } from "../features/chatAI/GeminiAPI"; // Import Gemini API helper
// Import Send icon from Lucide React
import { BeatLoader } from "react-spinners"; //Loading Animation

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageText, sender: "user" },
    ]);
    setIsLoading(true); // Show loading indicator

    try {
      const botResponse = await generateContent(messageText);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error getting Gemini response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error getting response. Please try again.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[400px] border border-gray-300 rounded-md overflow-hidden shadow-lg">
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center">
            <BeatLoader color="#36D7B7" size={10} />
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
