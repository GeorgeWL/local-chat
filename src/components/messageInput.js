import React, { useState } from "react";
import './messageInput.scss'
const MessageInput = ({ handleSend }) => {
  const [input, setInput] = useState("");
  return (
    <div className="messageInput">
      <input
        className='messageInput__input'
        onChange={e => setInput(e.target.value)}
        value={input}
        onKeyDown={e => e.key === "Enter" && handleSend(input)}
      />
      <button className='messageInput__btns' disabled={!input}  onClick={() => handleSend(input)}>
        Send
      </button>
    </div>
  );
};
export default MessageInput;
