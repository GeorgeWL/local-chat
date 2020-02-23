import React from "react";
import "./App.css";
import uuid from "uuid";
import MessageInput from "./components/messageInput";
import { BroadcastChannel } from "broadcast-channel";
import ChatWindow from "./components/chatWindow";
import MessageStack from "./components/messageStack";
import startCase from "lodash/startCase";
class App extends React.Component {
  state = {
    user: {
      userId: uuid(),
      username: ""
    },
    messageStack: [],
    downloadDataUri: ""
  };
  componentDidMount() {
    this.channel = new BroadcastChannel("chat-room");
    if (this.channel) {
      this.channel.addEventListener("message", msg => {
        this.handleMessageAdd(msg);
      });
    }
  }

  handleMessageAdd = msg => {
    const { messageStack } = this.state;
    messageStack.push(msg);
    this.setState({ messageStack });
  };

  handleMessageSend = msgText => {
    const msg = {
      id: uuid(),
      text: msgText,
      date: new Date(),
      isQuote: false,
      ...this.state.user
    };
    this.handleMessageAdd(msg);
    this.channel.postMessage(msg);
  };

  handleUsernameSend = username => {
    let { user } = this.state;
    user = { ...user, username };
    const msg = {
      id: uuid(),
      text: `"${username}" joined the chat`,
      date: new Date(),
      ...user
    };
    this.handleMessageAdd(msg);
    this.setState({ user });
  };

  handleQuote = msg => {
    let { user } = this.state;
    msg = {
      id: uuid(),
      text: `"${msg.username}" said:  ${msg.text}`,
      date: new Date(),
      isQuote: true,
      ...user
    };
    this.handleMessageAdd(msg);
    this.channel.postMessage(msg);
  };

  handleTranscript = () => {
    const { messageStack } = this.state;
    const initRow = Object.keys(messageStack[0]).map(key => startCase(key));
    const rows = [initRow.join(",")];
    const otherRows = messageStack.map(entry =>
      Object.values(entry).map(val => String(val))
    );
    otherRows.forEach(row => rows.push(row.join(",")));
    const data = rows.join("\n");
    const dataUri = "data:text/csv;charset=utf-8," + encodeURI(data);
    this.setState({ downloadDataUri: dataUri });
  };

  render() {
    const { user, messageStack, currentMessage, downloadDataUri } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Local Chat</h1>
          <h3>
            Open Two or More Browser Windows/Tabs on the same device to Have a
            localised chat-room.
            <br /> Each tab is treated as a unique user
          </h3>
        </header>
        <main>
          <ChatWindow>
            <MessageStack
              messages={messageStack}
              currentMessage={currentMessage}
              handleQuote={this.handleQuote}
            />
            <div className="AppChatWindowInput">
              {user.userId && user.username ? (
                <>
                  <label htmlFor="userMessage">Message</label>
                  <MessageInput
                    id="userMessage"
                    handleSend={this.handleMessageSend}
                  />
                  {messageStack && messageStack.length > 0 && (
                    <div className="App-transcript">
                      <button onClick={this.handleTranscript}>
                        Create Chat transcript
                      </button>
                      {downloadDataUri && (
                        <a
                          href={downloadDataUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          download="download.csv"
                        >
                          Click To Download!
                        </a>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label htmlFor="userName">Set Username:</label>
                  <MessageInput
                    id="userName"
                    handleSend={this.handleUsernameSend}
                  />
                </>
              )}
            </div>
          </ChatWindow>
        </main>
        <footer className="App-footer">
          Built with React.js{" "}
          <span role="img" aria-label="coder emoji">
            👩‍💻
          </span>{" "}
          and an hour or two by{" "}
          <a
            href="https://georgewl.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            George WL
            <span role="img" aria-label="lightning bolt emoji">
              ⚡
            </span>
          </a>
          <details>
            Built purely as an excuse to use the relatively new{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel"
            >
              BroadcastChannel API
            </a>
            , using a npm library{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://npmjs.org/package/broadcast-channel"
            >
              broadcast-channel
            </a>{" "}
            which polyfills older browsers.
          </details>
          <details>
            <summary>potential additions for the future</summary>
            <ul
              style={{
                listStyle: "circle",
                textAlign: "left"
              }}
            >
              <li>
                Add Connection to external data storage and transform into a
                fully network conected chat app
              </li>
              <li>
                Add selector on init which asks if want Local Chat or Remote
                chat
              </li>
              <li>Add possibilty to share chat by unique share id</li>
              <li>
                <span style={{ textDecoration: "line-through" }}>
                  Add chat transcript feature - text file
                </span>
              </li>
              <li>Add better chat transcript feature - text file</li>
            </ul>
          </details>
        </footer>
      </div>
    );
  }
}

export default App;
