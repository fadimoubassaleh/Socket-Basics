import React, { Component } from 'react';
import logo from './logo.svg';
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

  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div>
        hello
      </div>
    )
  }
}


export default App;
