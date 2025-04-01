// src/components/ui/Message.jsx
import React from "react";

const Message = ({ text, sender }) => {
  return (
    // Use flex properties on the parent container (in ChatbotPage)
    // This component just defines its look based on sender
    <div
      className={`max-w-[75%] break-words rounded-lg p-3 mb-2 shadow-sm ${ // Added shadow-sm
        sender === "user"
          ? "ml-auto bg-blue-500 text-white" // User: Blue background, white text, align right (via ml-auto)
          : "mr-auto bg-gray-100 text-gray-800" // Bot: Light gray background, dark text, align left (via mr-auto)
      }`}
    >
      {text}
    </div>
  );
};

export default Message;