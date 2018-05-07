import React, { Component } from 'react';
// import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

class App extends Component {

  state = { 
    socket: null, 
    globalNumber: 0, 
    message: null
  }

  handleMessageValue = (e) =>{
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
  }

  onIncrement = () => this.state.socket.emit('increment')
  onDecrement = () => this.state.socket.emit('decrement')
  render() {
    return (
      <div className='main-div' >
        <h1>username: {this.state.username} </h1>
        <form onSubmit={this.formSubmit}>
          <input type='text' onChange={this.handleMessageValue} />
          <button type='submit' >send</button>
        </form>
      </div>
    )
  }
}


export default App;
