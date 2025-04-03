// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatSidebar from '../components/ui/ChatSidebar';
import ChatInput from '../components/layout/ChatInput';
import Message from '../components/ui/Message'; // Your updated Message component
import SuggestionPrompts from '../components/ui/SuggestionPrompts';
import { SquarePen, ChevronDown, Lock } from 'lucide-react';

import { generateContent } from "../features/chatAI/GeminiAPI";
import { BeatLoader } from "react-spinners";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]); // Also scroll when loading indicator appears/disappears

  const handleSendMessage = async (messageText) => {
    const newUserMessage = { text: messageText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const botResponse = await generateContent(messageText);
      // Ensure botResponse is actually a string before creating the message
      const responseText = typeof botResponse === 'string' ? botResponse : JSON.stringify(botResponse); // Basic fallback
      const newBotMessage = { text: responseText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      const errorBotMessage = { text: "Sorry, I encountered an error. Please try again.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt);
  };

  const prompts = [
    'What is Stock Market?',
    'How to invest in stocks?',
    'Explain the concept of ETFs',
    'Summarize a long document',
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex h-[55px] flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center">
            <SquarePen className="mr-4 h-5 w-5 cursor-pointer text-gray-500" />
            <button className="flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
              <span className="mr-1">Chatbot</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </button>
          </div>
          <button className="flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            <Lock className="mr-1.5 h-4 w-4 text-gray-500" />
            Private
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {messages.length === 0 && !isLoading ? ( // Show welcome only if not loading and no messages
            // Welcome Screen
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h1 className="mb-1 text-xl font-medium text-gray-800 mt-12">FInTech</h1>
              <p className="mb-8 text-gray-500">Start a conversation to see responses</p>
              <div className="w-full max-w-xl">
                <SuggestionPrompts prompts={prompts} onPromptClick={handleSuggestionClick} />
              </div>
            </div>
          ) : (
            // Messages List
            <div className="flex flex-col">
              {messages.map((message, index) => (
                <Message key={index} text={message.text} sender={message.sender} />
              ))}

              {/* --- CORRECTED LOADING INDICATOR --- */}
              {/* Render BeatLoader directly when isLoading is true */}
              {isLoading && (
                <div
                  className={`max-w-[85%] self-start break-words rounded-lg p-3 mb-2 shadow-sm mr-auto bg-gray-100`} // Mimic bot bubble style
                >
                  <BeatLoader color="#6B7280" size={8} /> {/* Use a gray color */}
                </div>
              )}
              {/* --- END CORRECTED LOADING INDICATOR --- */}

              {/* Scroll target */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="px-4 pb-4 md:px-6 md:pb-6 border-t border-gray-200 bg-white pt-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;