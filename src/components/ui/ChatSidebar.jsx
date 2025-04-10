// src/components/ui/ChatSidebar.jsx
import React from 'react';
import { Plus, LogIn, GripHorizontal, Home, Trash2, BookOpen, GraduationCap, Rocket, X } from 'lucide-react'; // Imported X for close icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ChatSidebar = ({ setLevel, selectedLevel, theme, chats, setChats, isLoggedIn, setIsLoggedIn, openPricingDialog, onMobileCloseSidebar }) => { // Added onMobileCloseSidebar prop
    const navigate = useNavigate(); // Get navigate instance

    const handleNewChat = () => {
        if (!isLoggedIn) {
            alert("Please sign in to save and manage chats."); // Or use a more elegant UI notification
            return;
        }
        const newChatName = `Chat ${chats.length + 1}`; // Simple naming for now
        setChats([...chats, newChatName]);
        // In a real app, you would also initiate a new chat session and store it in local storage or backend.
    };

    const handleDeleteChat = (indexToDelete) => {
        const updatedChats = chats.filter((_, index) => index !== indexToDelete);
        setChats(updatedChats);
        // In a real app, you would also delete the chat session from local storage or backend.
    };

    const isDarkTheme = theme === 'dark'; // Helper for dark theme

    return (
        <aside className={`flex h-full w-64 flex-shrink-0 flex-col border-r border-gray-200 ${isDarkTheme ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800'}`}> {/* Theme sidebar background and text */}
            {/* Sidebar Header - Home Link and Close Button for Mobile */}
            <div className="flex items-center justify-between px-4 py-3">
                <a href="/" className="flex items-center text-lg font-semibold">
                    <Home size={20} className="mr-2" /> {/* Home Icon */}
                    FInTech.ai
                </a>
                <button
                    onClick={onMobileCloseSidebar} // Call the function to close sidebar
                    className="sm:hidden" // Hidden on small screens and up
                    aria-label="Close Sidebar"
                >
                    <X size={20} className={`${isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`} /> {/* Close Icon - X */}
                </button>
            </div>

            {/* Navigation - User Levels */}
            <nav className="px-2 py-2">
                <NavItem
                    icon={<BookOpen size={18} />} // Changed icon to BookOpen for Basic
                    text="Basic"
                    level="basic"
                    setLevel={setLevel}
                    isActive={selectedLevel === 'basic'}
                    theme={theme} // Pass theme prop
                />
                <NavItem
                    icon={<GraduationCap size={18} />} // Changed icon to GraduationCap for Intermediate
                    text="Intermediate"
                    level="intermediate"
                    setLevel={setLevel}
                    isActive={selectedLevel === 'intermediate'}
                    theme={theme} // Pass theme prop
                />
                <NavItem
                    icon={<Rocket size={18} />} // Changed icon to Rocket for Advanced
                    text="Advanced"
                    level="advanced"
                    setLevel={setLevel}
                    isActive={selectedLevel === 'advanced'}
                    theme={theme} // Pass theme prop
                />
            </nav>

            {/* Chats Section */}
            <div className="mt-4 px-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase text-gray-500">Chats</span>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <Plus size={16} className="cursor-pointer hover:text-gray-700" onClick={handleNewChat} />
                        <GripHorizontal size={16} className="cursor-pointer hover:text-gray-700" />
                    </div>
                </div>
                {!isLoggedIn && (
                    <div className={`mb-4 rounded-md p-3 text-center text-sm ${isDarkTheme ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-600'}`}> {/* Theme login message */}
                        Login to save and revisit previous chats!
                    </div>
                )}
                {/* Chat List */}
                <div>
                    {isLoggedIn && chats.map((chat, index) => ( // Conditionally render chats based on login
                        <div key={index} className="relative"> {/* Relative positioning for delete button */}
                            <a
                                href="#" // Replace with actual chat link/functionality
                                className={`block mb-1 rounded-md px-3 py-2 pr-8 text-sm ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`} // Theme chat list item
                            >
                                {chat}
                            </a>
                            <button
                                onClick={() => handleDeleteChat(index)}
                                className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600`}
                                aria-label={`Delete chat ${chat}`}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sign In Button */}
            {!isLoggedIn && (
                <div className="px-4 mb-4">
                    <button
                        className={`flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // Theme sign-in button
                        onClick={() => navigate('/signin')} // Redirect to sign-in page
                    >
                        <LogIn size={16} className="mr-2" />
                        Sign in
                    </button>
                </div>
            )}
            {isLoggedIn && (
                <div className="px-4 mb-4">
                    <button
                        className={`flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium ${isDarkTheme ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} // Theme sign-out button
                        onClick={() => setIsLoggedIn(false)} // Example logout toggle
                    >
                        <LogIn size={16} className="mr-2 rotate-180" /> {/* Rotate icon for sign out */}
                        Sign out
                    </button>
                </div>
            )}


            {/* Bottom Section */}
            <div className="mt-auto border-t border-gray-200 p-4" style={{ borderTopColor: isDarkTheme ? '#4B5563' : '#D1D5DB' }}> {/* Theme border */}
                <button
                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    onClick={openPricingDialog} // Call openPricingDialog on click
                >
                    Upgrade
                </button>
            </div>
        </aside>
    );
};

// Helper component for Navigation items
const NavItem = ({ icon, text, level, setLevel, isActive, theme }) => { // Receive isActive and theme props
    const isDarkTheme = theme === 'dark';
    return (
        <a
            href="#"
            className={`mb-1 flex items-center rounded-md px-3 py-2 text-sm ${isDarkTheme ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'} ${isActive ? (isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800') : ''}`} // Active state styling - theme aware
            onClick={() => setLevel(level)}
        >
            <span className="mr-3">{icon}</span>
            {text}
        </a>
    );
};

export default ChatSidebar;