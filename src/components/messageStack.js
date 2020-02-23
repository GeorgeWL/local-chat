import React from "react";
import MessageItem from "./messageItem";
import "./messageStack.scss";
const MessageStack = ({ messages, currentMessage, handleQuote }) => (
  <div className="messageStack">
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
