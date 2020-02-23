import React, { useState } from "react";
import "./messageInput.scss";
const MessageInput = ({ handleSend }) => {
  const [input, setInput] = useState("");
  function sendHandler(val) {
    handleSend(val);
    setInput("");
  }
  return (
    <div className="messageInput">
      <input
        className="messageInput__input"
        onChange={e => setInput(e.target.value)}
        value={input}
        onKeyDown={e => e.key === "Enter" && sendHandler(input)}
      />
      <button
        className="messageInput__btns"
        disabled={!input}
        onClick={() => sendHandler(input)}
      >
        Send
      </button>
    </div>
  );
};
export default MessageInput;
