import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

class App extends Component {

  state = {
    socket: null,
    globalNumber: 0,
    message: null,
    messages: []
  }

  handleMessageValue = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  formSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.message);
    this.state.socket.emit('text', this.state.message)
  }

  componentDidMount() {
    const socket = io('http://localhost:8888');

    this.setState({ socket })

    socket.on('number:change', (globalNumber) => {
      this.setState({ globalNumber })
    })

    socket.on('user:new', (username) => {
      console.log('a user called ' + username + ' has connected')
    })

    socket.on('user:me', (username) => {
      this.setState({ username })
    })

    socket.on('text', (messages) => {
      console.log(messages)
      // let finalList = <h1>Our Messages</h1>
      // for (let i = 0; i < messages.length; i++) {
      //   finalList += messages[i]
      // }
      this.setState({
        messages: messages
      })
    })
  }

  showMessages = () => {
    let messages = this.state.messages
    if (!messages) {
      return
    } else {
      // messages = messages.conversations
      console.log(messages)
      messages.map((message) => {
        return (
          <ul>{message}</ul>
        )
      })
    }
  }
  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div className='main-div' >
        {console.log('my name is ' + this.state.username)}
        <h1>username: {this.state.username} </h1>
        <form onSubmit={this.formSubmit}>
          <input type='text' onChange={this.handleMessageValue} />
          <button type='submit' >send</button>
        </form>
        {
          this.state.messages.map((message) => {
            return (
              <ul>{message}</ul>
            )
          })}
      </div>
    )
  }
}


export default App;
