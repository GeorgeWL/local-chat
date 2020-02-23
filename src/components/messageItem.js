import React from "react";
import dayjs from "dayjs";
import "./messageItem.scss";
import classNames from "classnames";
const MessageItem = ({ msg, handleQuote }) => (
  <div
    className={classNames("messageItem", msg.isQuote && "messageItem__quote")}
  >
    <strong>{dayjs(msg.date).format("DD-MMM-YYYY HH:mm:ss")}</strong>
    <div>{msg.username}</div>
    <div>{msg.text}</div>
    {handleQuote && (
      <button className="messageItem__link" onClick={() => handleQuote(msg)}>
        quote this
      </button>
    )}
  </div>
);
export default MessageItem;
