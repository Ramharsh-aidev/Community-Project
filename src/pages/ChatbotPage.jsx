// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatSidebar from '../components/ui/ChatSidebar';
import ChatInput from '../components/layout/ChatInput';
import Message from '../components/ui/Message';
import SuggestionPrompts from '../components/ui/SuggestionPrompts';
// Removed logo import: import OpenAILogo from './logo.jpeg';
import { SquarePen, ChevronDown, Lock } from 'lucide-react';

// Import your API helper and Loader
import { generateContent } from "../features/chatAI/GeminiAPI"; // Adjust path if needed
import { BeatLoader } from "react-spinners";

const ChatbotPage = () => {
  // State for messages and loading indicator
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ref for scrolling to the bottom of the messages list
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect hook to scroll down whenever the messages array changes
  useEffect(scrollToBottom, [messages]);

  // Async function to handle sending a message and getting a response
  const handleSendMessage = async (messageText) => {
    // Add user's message to the state immediately
    const newUserMessage = { text: messageText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    setIsLoading(true); // Show loader

    try {
      // Call the API function
      const botResponse = await generateContent(messageText);
      const newBotMessage = { text: botResponse, sender: "bot" };
      // Add bot's response to the state
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      // Add an error message to the state if API call fails
      const errorBotMessage = { text: "Sorry, I encountered an error. Please try again.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false); // Hide loader regardless of success/failure
    }
  };

  // Function to handle clicks on suggestion prompts
  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt); // Treat the prompt click as sending a message
  };

  // Define the suggestion prompts to display initially
  const prompts = [
    'Experience Seoul like a local',
    'Quiz me on ancient civilizations',
    'Summarize a long document',
    'Create a workout plan',
  ];

  return (
    // Main container for the entire page
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Render the Sidebar */}
      <ChatSidebar />

      {/* Main Chat Area container */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex h-[55px] flex-shrink-0 items-center justify-between border-b border-gray-200 px-4">
          {/* Left side of Top Bar (New Chat Icon, Model Selector) */}
          <div className="flex items-center">
            <SquarePen className="mr-4 h-5 w-5 cursor-pointer text-gray-500" />
            <button className="flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
              {/* Removed logo img tag */}
              {/* <img src={OpenAILogo} alt="Model" className="mr-2 h-4 w-4" /> */}
              <span className="mr-1"> {/* Added span for spacing if needed */}
                 Dh {/* Placeholder model name */}
              </span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </button>
          </div>
          {/* Right side of Top Bar (Privacy Selector) */}
          <button className="flex items-center rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
            <Lock className="mr-1.5 h-4 w-4 text-gray-500" />
            Private {/* Placeholder privacy status */}
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Chat Messages Area (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {messages.length === 0 ? (
            // Welcome Screen (shown only if there are no messages)
            <div className="flex h-full flex-col items-center justify-center text-center">
              {/* Removed logo img tag */}
              {/* <img src={OpenAILogo} alt="GPT Logo" className="mb-4 h-12 w-12" /> */}
              <h1 className="mb-1 text-xl font-medium text-gray-800 mt-12">GPT 4o Mini</h1> {/* Added margin-top */}
              <p className="mb-8 text-gray-500">Start a conversation to see responses</p>
              <div className="w-full max-w-xl">
                {/* Render suggestion prompts and pass the click handler */}
                <SuggestionPrompts prompts={prompts} onPromptClick={handleSuggestionClick} />
              </div>
            </div>
          ) : (
            // Messages List (shown if there are messages)
            <div className="flex flex-col"> {/* Container for messages and loader */}
              {messages.map((message, index) => (
                // Render each message using the Message component
                <Message key={index} text={message.text} sender={message.sender} />
              ))}
              {/* Loading Indicator (shown while waiting for bot response) */}
              {isLoading && (
                <div className="mr-auto flex items-center self-start pl-2 pt-2"> {/* Aligns loader to left */}
                  <Message sender="bot" text={<BeatLoader color="#CBD5E1" size={8} />} /> {/* Use gray loader inside bubble */}
                </div>
              )}
              {/* Empty div used as a target for scrolling */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input Area (fixed at the bottom) */}
        <div className="px-4 pb-4 md:px-6 md:pb-6 border-t border-gray-200 bg-white pt-4"> {/* Added padding-top */}
          {/* Render the ChatInput component and pass the send message handler */}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;