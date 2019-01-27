import React, { Component } from 'react';
import SimpleForm from './GenRedux'
import Verifications from './VerRedux'
// import showResults from './Redux/showResult'
import { Provider } from "react-redux"
import store from "./Redux/store";
import io from 'socket.io-client'
const socketUrl ='http://localhost:4000/'



var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
      var cipher = crypto.createCipher(algorithm,password)
      var crypted = cipher.update(JSON.stringify(text),'utf8','hex')
      crypted += cipher.final('hex');
      console.log(crypted)
      return crypted;
    }




//Crypto шифровка проверить на сокетах как расшифровывает....
// назнчить новости сокет Io нужно заменять сообщения после клика очишать через 30 сек
// проверить редукс форм и его состаяния боюсь что может быть переписать статы надо будет но работает а отлично именно надо научиться сбрасывать счетчик



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {popupVisible: false,
                  socket:null,
                  user:true,
                  error:'',news:[]
              }
  }

  componentDidMount(){
    this.initSocket()
  }
  
  initSocket =()=>{
    const socket = io.connect(socketUrl)
    socket.on('connect',()=>{
      console.log('connected')
    })
    this.setState({socket})
  }
  setError =(error)=>{
    this.setState({error})
  }
  
  showResults=async values=> {
      const{socket}=this.state
      const a =encrypt(values)
      socket.emit('my other event', { decruptData: a });
      socket.on('news',  (news) => {
        console.log(news)
        this.setState({news:news})
        this.setState({user:false})
        this.setState({popupVisible:false})
         
      })      
  }
  verResult =values =>{
    const{socket}=this.state
    socket.emit('verevent',  values );
    this.setState({news:[]})
    // socket.on('news',  (news) => {
    //   // console.log(news)
    //   // this.setState({news:news})
    //   // this.setState({user:false})
    //   // this.setState({popupVisible:false})
       
    // })
  }
  showNews=()=>{
    const{news}=this.state
    return <div><div>{news.text}</div><div>{news.Api}</div></div>
  }

  addToken=()=>{this.setState({popupVisible: true})}
  ManageToken=()=>{this.setState({popupVisible: false})}
  
  
  render() {
     
    const{popupVisible,user} =this.state
      
    
    return (
      <div>
        <Provider store={store}>
        <div>{this.showNews()}</div>
      {
        !popupVisible?   
                  <div>
                  {!user?
                  <Verifications onSubmit={this.verResult}/>
                  :
                  <button  onClick={this.addToken} >Создать токен</button>}
                  </div>
        :
        <div>          
        <button onClick={this.ManageToken}>назад</button>
        <SimpleForm onSubmit={this.showResults} TimeCreate={Date.now()}/>
        </div>
      }
      </Provider>
      </div>
    )
  }
}

export default App;