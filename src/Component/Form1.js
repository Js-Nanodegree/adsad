import React, { Component } from 'react';
import SimpleForm from './FormRedux'
import showResults from './Redux/showResult'
import { Provider } from "react-redux"
import store from "./Redux/store";
import io from 'socket.io-client'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {popupVisible: false}
  }

  addToken=()=>{this.setState({popupVisible: true})}
  ManageToken=()=>{this.setState({popupVisible: false})}
  
  setUser =(popupVisible)=>{
    this.setState({popupVisible})
    // var socket = io.connect('http://localhost:4000/');
    // socket.on('news', function (data) {
    //   console.log(data)
    // })
    // this.setState({popupVisible})
  }

  render() {
    const{popupVisible} =this.state
    
    return (
      <div>
      {
        !popupVisible?   <div>
        <button onClick={this.addToken} >Создать токен</button>
          </div>
        :
        <div>
          <Provider store={store}>
            <SimpleForm onSubmit={showResults} TimeCreate={Date.now()}/>
          </Provider>
        </div>
      }
      </div>
    )
  }
}

export default App;