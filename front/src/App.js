import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

class App extends Component {

  state = { socket: null, globalNumber: 0 }

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
  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div>
        {this.state.username}
      </div>
    )
  }
}


export default App;
