// src/components/ui/ChatSidebar.jsx
import React, { useState } from 'react';
import { LayoutGrid, MessageSquare, Bot, Plus, Settings, LogIn, ChevronUp, ChevronDown, GripHorizontal } from 'lucide-react';

const ChatSidebar = () => {
  const [utilitiesOpen, setUtilitiesOpen] = useState(false);

  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white"> {/* Added flex-shrink-0 */}
      {/* Header */}
      <div className="px-4 py-3 text-lg font-semibold text-gray-800">
        FInTech.ai {/* Placeholder name */}
      </div>

      {/* Navigation */}
      <nav className="px-2 py-2">
        <NavItem icon={<LayoutGrid size={18} />} text="All Tools" />
        <NavItem icon={<MessageSquare size={18} />} text="Arena" />
        <NavItem icon={<Bot size={18} />} text="Assistants" />
      </nav>

      {/* Chats Section */}
      <div className="mt-4 px-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase text-gray-500">Chats</span>
          <div className="flex items-center space-x-2 text-gray-500">
            <Plus size={16} className="cursor-pointer hover:text-gray-700" />
            <GripHorizontal size={16} className="cursor-pointer hover:text-gray-700" />
          </div>
        </div>
        <div className="mb-4 rounded-md bg-gray-50 p-3 text-center text-sm text-gray-600">
          Login to save and revisit previous chats!
        </div>
      </div>

      {/* Sign In Button */}
       <div className="px-4 mb-4">
          <button className="flex w-full items-center justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
            <LogIn size={16} className="mr-2" />
            Sign in
          </button>
       </div>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <button
          onClick={() => setUtilitiesOpen(!utilitiesOpen)}
          className="mb-3 flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span className="flex items-center">
            <Settings size={16} className="mr-2" /> Utilities
          </span>
          {utilitiesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {/* Placeholder for conditionally rendered utilities content */}
        {/* {utilitiesOpen && <div className="pl-5 text-sm mb-2">Utility links...</div>} */}

        <button className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Upgrade
        </button>
      </div>
    </aside>
  );
};

// Helper component for Navigation items
const NavItem = ({ icon, text }) => (
  <a
    href="#" // Replace with actual links or onClick handlers later
    className="mb-1 flex items-center rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800"
  >
    <span className="mr-3">{icon}</span>
    {text}
  </a>
);

export default ChatSidebar;