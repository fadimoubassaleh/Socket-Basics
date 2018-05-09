import React, { Component } from 'react';
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
    const message = { user: this.state.username, message: this.state.message }
    this.setState({
      message: ''
    })
    if (this.state.message === "" || this.state.message === null) {
      console.log('null')
      return
    } else {
      this.state.socket.emit('text', message)
    }
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

    socket.on('text', (message) => {
      const messages = [...this.state.messages, message]
      this.setState({messages})
    })
  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div className='main-div' >
        <h1>username: {this.state.username} </h1>
        <form onSubmit={this.formSubmit}>
          <input type='text' onChange={this.handleMessageValue} value={this.state.message} />
          <button type='submit' >send</button>
        </form>
        {
          this.state.messages.map((e, key) => {
            return (
              <ul key={key}>{e.user} sent: {e.message}</ul>
            )
          })
        }
      </div>
    )
  }
}


export default App;
