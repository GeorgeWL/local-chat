import React from "react";
import logo from "./logo.svg";
import "./App.css";
import uuid from "uuid";
import MessageInput from "./components/messageInput";
import { BroadcastChannel } from "broadcast-channel";
import ChatWindow from "./components/chatWindow";
import MessageStack from "./components/messageStack";
class App extends React.Component {
  state = {
    user: {
      userId: uuid(),
      username: ""
    },
    messageStack: []
  };
  componentDidMount() {
    this.channel = new BroadcastChannel("chat-room");
    if (this.channel) {
      this.channel.addEventListener("message", msg => {
        console.warn("msg", msg);
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
    console.warn("msg", msg);

    // this.handleMessageSend()
  };

  render() {
    const { user, messageStack, currentMessage } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Local Chat</h1>
          <h3>
            Open Two or More Browser Windows on the Device to Have a Localised
            chat-room
          </h3>
          <div>
            Potential Extra features:
            <ul>
              <li>
                <input type="checkbox" disabled value={true}>
                  Checked
                </input>
              </li>
            </ul>
          </div>
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
      </div>
    );
  }
}

export default App;
