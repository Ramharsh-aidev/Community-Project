import React from "react";

const Message = ({ text, sender }) => {
  return (
    <div
      className={`mb-2 p-3 rounded-lg break-words ${
        sender === "user"
          ? "bg-green-200 text-right self-end"
          : "bg-gray-100 text-left self-start"
      }`}
    >
      {text}
    </div>
  );
};

export default Message;
