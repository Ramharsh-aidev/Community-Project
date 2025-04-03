// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatSidebar from '../components/ui/ChatSidebar';
import ChatInput from '../components/layout/ChatInput';
import Message from '../components/ui/Message';
import SuggestionPrompts from '../components/ui/SuggestionPrompts';
import { SquarePen, ChevronDown, Lock, Sun, Moon, Settings } from 'lucide-react'; // Import Settings icon
import { generateContent } from "../features/chatAI/GeminiAPI";
import { BeatLoader } from "react-spinners";

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [userLevel, setUserLevel] = useState('basic'); // State for user level, default to basic
    const [theme, setTheme] = useState('light'); // Page-local theme state
    const [utilitiesOpen, setUtilitiesOpen] = useState(false); // For utilities dropdown in top bar

    // --- SYSTEM PROMPT (Now includes level) ---
    const systemPromptBase = `You are a specialized financial advisor chatbot. Your sole purpose is to provide information and answer questions strictly related to finance, investing, economics, stock markets, personal finance management, budgeting, financial planning, insurance, and related financial concepts.

Do NOT answer questions about any other topics, including but not limited to: general knowledge, history, science, celebrities, coding, cooking, creative writing, or personal opinions unrelated to finance.

If the user asks a question outside of your designated financial domain, you MUST respond with a polite refusal stating your specialization. For example: "I am a financial advisor bot and can only help with finance-related questions. Please ask something about finance, investing, or economics." or "My apologies, I specialize in financial topics. Could you ask a question related to finance?"

Do not engage in casual conversation unrelated to finance. Stick strictly to your role as a financial advisor assistant.`;

    const getSystemPrompt = (level) => {
        let levelInstructions = "";
        if (level === 'intermediate') {
            levelInstructions = ` Provide more detailed explanations and assume the user has some existing financial knowledge. The user level is ${level}.`; // Added level to prompt
        } else if (level === 'advanced') {
            levelInstructions = ` Provide highly detailed and technical answers, assuming the user has significant financial expertise. Use financial jargon where appropriate. The user level is ${level}.`; // Added level to prompt
        } else { // basic or default
            levelInstructions = ` Provide simple and easy-to-understand explanations suitable for beginners in finance. Avoid complex jargon. The user level is ${level}.`; // Added level to prompt
        }
        return systemPromptBase + levelInstructions;
    };
    // --- END SYSTEM PROMPT ---


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        const newUserMessage = { text: messageText, sender: "user" };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setIsLoading(true);

        // --- GET SYSTEM PROMPT WITH CURRENT LEVEL ---
        const currentSystemPrompt = getSystemPrompt(userLevel);
        const fullPrompt = `${currentSystemPrompt}\n\nUser Question: ${messageText}\n\nAnswer:`;
        // --- END PROMPT WITH LEVEL ---

        try {
            const botResponse = await generateContent(fullPrompt);
            const responseText = typeof botResponse === 'string' ? botResponse : JSON.stringify(botResponse);
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

    const handleSetLevel = (level) => {
        setUserLevel(level);
        console.log(`User level set to: ${level}`); // Optional: Log level change
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    const prompts = [
        'What is the difference between stocks and bonds?',
        'How does compound interest work?',
        'Explain the concept of diversification in investing.',
        'What are some common budgeting strategies?',
    ];

    const isDarkTheme = theme === 'dark'; // Helper for cleaner class names

    return (
        <div className={`flex h-screen overflow-hidden ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white'}`}> {/* Page-level theme bg and text - but global theme now */}
            <ChatSidebar setLevel={handleSetLevel} selectedLevel={userLevel} theme={theme} /> {/* Pass handleSetLevel, selectedLevel and theme to sidebar */}
            <div className="flex flex-1 flex-col">
                {/* Top Bar */}
                <div className={`flex h-[55px] flex-shrink-0 items-center justify-between border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'} px-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}> {/* Theme top bar bg and border */}
                    <div className="flex items-center">
                        <SquarePen className={`mr-4 h-5 w-5 cursor-pointer ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} /> {/* Theme icon color */}
                        <span className={`mr-1 font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'}`}>Financial Advisor Chat</span> {/* Theme text color */}
                    </div>
                    <div className="relative"> {/* Utilities dropdown container */}
                        <button
                            onClick={() => setUtilitiesOpen(!utilitiesOpen)}
                            className={`flex items-center rounded-md border ${isDarkTheme ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-700'} px-3 py-1 text-sm`}
                        >
                            <Settings className="mr-1.5 h-4 w-4" /> Utilities
                        </button>
                        {utilitiesOpen && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-xl z-10 ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}> {/* Theme dropdown */}
                                <button
                                    onClick={toggleTheme}
                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${isDarkTheme ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700'}`} // Theme dropdown item
                                >
                                    {isDarkTheme ? <Sun className="mr-2 h-4 w-4 inline-block" /> : <Moon className="mr-2 h-4 w-4 inline-block" />}
                                    {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                                </button>
                                {/* Add more utility options here if needed */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Messages Area */}
                <div className={`flex-1 overflow-y-auto p-4 md:p-6 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}> {/* Theme chat area bg */}
                    {messages.length === 0 && !isLoading ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <h1 className={`mb-1 text-xl font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-800'} mt-12`}>FinTech Advisor</h1> {/* Theme text color */}
                            <p className={`mb-8 ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>Ask me anything about finance, investing, or economics.</p> {/* Theme text color */}
                            <div className="w-full max-w-xl">
                                <SuggestionPrompts prompts={prompts} onPromptClick={handleSuggestionClick} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {messages.map((message, index) => (
                                <Message key={index} text={message.text} sender={message.sender} theme={theme} /> // Pass theme to Message
                            ))}
                            {isLoading && (
                                <div
                                    className={`max-w-[85%] self-start break-words rounded-lg p-3 mb-2 shadow-sm mr-auto ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`} // Theme loading bubble bg
                                >
                                    <BeatLoader color={isDarkTheme ? "#D1D5DB" : "#6B7280"} size={8} /> {/* Theme loader color */}
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Chat Input Area */}
                <div className={`px-4 pb-4 md:px-6 md:pb-6 border-t ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} pt-4`}> {/* Theme input area bg and border */}
                    <ChatInput onSendMessage={handleSendMessage} theme={theme} /> {/* Pass theme to ChatInput */}
                    <p className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'} text-center mt-2 px-2`}> {/* Theme disclaimer text color */}
                        Disclaimer: This chatbot provides information for educational purposes only and is not financial advice. Consult with a qualified professional for personalized advice.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;