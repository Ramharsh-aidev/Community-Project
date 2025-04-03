// src/components/ui/Message.jsx
import React from "react";
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

const Message = ({ text, sender }) => {
  return (
    // This outer div handles alignment and basic bubble shape/styling
    <div
      className={`max-w-[85%] break-words rounded-lg p-3 mb-2 shadow-sm ${ // Increased max-width slightly, kept p-3
        sender === "user"
          ? "ml-auto bg-blue-600 text-white" // User styles: Darker blue, white text, align right
          // Bot styles: Apply prose classes here for rich text formatting
          : "mr-auto bg-gray-100 text-gray-800 prose prose-sm prose-neutral max-w-none"
          // prose: Base typography styles
          // prose-sm: Smaller text size for chat
          // prose-neutral: Neutral color scheme
          // max-w-none: Important! Resets prose's own max-width so parent max-w-[85%] takes precedence
      }`}
    >
      {/* Conditionally render content based on sender */}
      {sender === "bot" ? (
        // Use ReactMarkdown for bot messages
        <ReactMarkdown
          components={{
            // Customize rendering of specific Markdown elements
            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />, // Better paragraph spacing
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
            a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all" />, // Style links
            // Add other customizations (code, blockquote) if needed
          }}
        >
          {text}
        </ReactMarkdown>
      ) : (
        // Render user message text directly (no Markdown parsing)
        text
      )}
    </div>
  );
};

export default Message;