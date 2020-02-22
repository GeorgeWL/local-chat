import React from 'react';
import logo from './logo.svg';
import './App.css';
// import BroadCastChannel from ''
class App extends React.Component {
  state = {
    currentMessage: { user: '', message: '' },
    messageStack: []
  }
  componentDidMount() {
    this.user = 
    this.channel = new BroadcastChannel('chat-room')
    this.channel.onmessage(evt => {
      const { data } = evt;
      const { messageStack } = this.state;
      messageStack.push(data)
      this.setState({ currentMessage: data,messageStack })
    })
  }
  handleMessageSend = msg =>{
    this.channel.postMessage(msg)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>

      </div>
    );
  }
}

export default App;
