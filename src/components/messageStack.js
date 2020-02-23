import React from "react";
import MessageItem from "./messageItem";
const MessageStack = ({ messages, currentMessage, handleQuote }) => (
  <div
    className="messageStack"
    style={{ display: "flex", justifyContent: "center" }}
  >
    {messages &&
      messages.length > 0 &&
      messages.map(msg => (
        <MessageItem
          msg={msg}
          key={msg.id}
          id={msg.id}
          handleQuote={handleQuote}
        />
      ))}
    {currentMessage && currentMessage.userId && (
      <MessageItem msg={currentMessage} />
    )}
  </div>
);
export default MessageStack;
