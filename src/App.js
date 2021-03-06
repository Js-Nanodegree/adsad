import React, { Component } from 'react';
import SimpleForm from './Form'
import showResults from './Redux/showResult'
import { Provider } from "react-redux"
import store from "./Redux/store";
import Dad from './dad'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {popupVisible: false}
  }

  addToken=()=>{this.setState({popupVisible: true})}
  ManageToken=()=>{this.setState({popupVisible: false})}
  
  setUser =(popupVisible)=>{
    // const {socket}=this.state
    // socket.emit(USER_CONNECTED,popupVisible)
    this.setState({popupVisible})
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
            <SimpleForm onSubmit={showResults} setUser={this.setUser} />
            {/* <Values form="simple" /> */}
          </Provider>
          <dat />
          <button setState={this.ManageToken}>Отправить</button>
        </div>
      }
      </div>
    )
  }
}

export default App;
