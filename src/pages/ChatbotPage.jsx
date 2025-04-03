// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatSidebar from '../components/ui/ChatSidebar';
import ChatInput from '../components/layout/ChatInput';
import Message from '../components/ui/Message'; // Your updated Message component
import SuggestionPrompts from '../components/ui/SuggestionPrompts';
import { SquarePen, ChevronDown, Lock } from 'lucide-react';

import { generateContent } from "../features/chatAI/GeminiAPI"; // Assuming this function calls the AI
import { BeatLoader } from "react-spinners";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- SYSTEM PROMPT ---
  // This defines the AI's role and restrictions.
  const systemPrompt = `You are a specialized financial advisor chatbot. Your sole purpose is to provide information and answer questions strictly related to finance, investing, economics, stock markets, personal finance management, budgeting, financial planning, insurance, and related financial concepts.

Do NOT answer questions about any other topics, including but not limited to: general knowledge, history, science, celebrities, coding, cooking, creative writing, or personal opinions unrelated to finance.

If the user asks a question outside of your designated financial domain, you MUST respond with a polite refusal stating your specialization. For example: "I am a financial advisor bot and can only help with finance-related questions. Please ask something about finance, investing, or economics." or "My apologies, I specialize in financial topics. Could you ask a question related to finance?"

Do not engage in casual conversation unrelated to finance. Stick strictly to your role as a financial advisor assistant.`;
  // --- END SYSTEM PROMPT ---


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return; // Ignore empty messages

    const newUserMessage = { text: messageText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    // --- COMBINE SYSTEM PROMPT WITH USER MESSAGE ---
    // We prepend the system instructions to the user's query.
    // How you structure this might depend slightly on the exact API (`generateContent` implementation),
    // but sending it as part of the input text is common.
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${messageText}\n\nAnswer:`;
    // --- END COMBINATION ---

    try {
      // --- SEND THE FULL PROMPT TO THE AI ---
      const botResponse = await generateContent(fullPrompt);
      // --- END SEND ---

      // Ensure botResponse is actually a string before creating the message
      const responseText = typeof botResponse === 'string' ? botResponse : JSON.stringify(botResponse); // Basic fallback
      const newBotMessage = { text: responseText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      const errorBotMessage = { text: "Sorry, I encountered an error processing your request. Please try again.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt);
  };

  // Ensure prompts are finance-related
  const prompts = [
    'What is the difference between stocks and bonds?',
    'How does compound interest work?',
    'Explain the concept of diversification in investing.',
    'What are some common budgeting strategies?',
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <ChatSidebar />
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex h-[55px] flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center">
            {/* Consider making the "New Chat" icon functional later */}
            <SquarePen className="mr-4 h-5 w-5 cursor-pointer text-gray-500" />
             {/* Keep UI simple for now */}
             <span className="mr-1 font-medium">Financial Advisor Chat</span>
            {/* <button className="flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
              <span className="mr-1">Chatbot</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </button> */}
          </div>
           {/* Removed Private button for simplicity, add back if needed */}
          {/* <button className="flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            <Lock className="mr-1.5 h-4 w-4 text-gray-500" />
            Private
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
          </button> */}
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {messages.length === 0 && !isLoading ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              {/* Updated Welcome Message */}
              <h1 className="mb-1 text-xl font-medium text-gray-800 mt-12">FinTech Advisor</h1>
              <p className="mb-8 text-gray-500">Ask me anything about finance, investing, or economics.</p>
              <div className="w-full max-w-xl">
                <SuggestionPrompts prompts={prompts} onPromptClick={handleSuggestionClick} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((message, index) => (
                <Message key={index} text={message.text} sender={message.sender} />
              ))}
              {isLoading && (
                <div
                  className={`max-w-[85%] self-start break-words rounded-lg p-3 mb-2 shadow-sm mr-auto bg-gray-100`}
                >
                  <BeatLoader color="#6B7280" size={8} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="px-4 pb-4 md:px-6 md:pb-6 border-t border-gray-200 bg-white pt-4">
          <ChatInput onSendMessage={handleSendMessage} />
          {/* Optional: Add a small disclaimer */}
          <p className="text-xs text-gray-400 text-center mt-2 px-2">
            Disclaimer: This chatbot provides information for educational purposes only and is not financial advice. Consult with a qualified professional for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;