import React, { Component } from 'react';

import './App.css';




class App extends Component {
  constructor(props) {
    super(props)
    this.state={}    
  }
  render() {


    const header =(<div>
    <button className='Btn_new'> 
      <p>New Token</p>
    </button> 
    <button className='Btn_new'>
      <p>New Token</p>
    </button> 
    <button className='Btn_new'>
      <p>New Token</p>
    </button>
    <button className='Btn_new'>
      <p>New Token</p>
    </button><button className='Btn_new'>
      <p>New Token</p>
    </button>
  </div>)
    
    const Profile =(
    <div>
      <table className='Table_cenr'>
      <tbody>
        <tr> 
          <td className='T_name'>TOKEN NAME</td>
          <td className='.T_ame'>{this.state.TokenName}</td>
        </tr>
        <tr> 
          <td>Индификатор токена</td>
          <td>{this.state.TokenID}</td>
        </tr>
        <tr> 
          <td>Публичный ключ</td>
          <td>{this.state.PublicID}</td>
        </tr>        
        <tr> 
          <td>Дата создания ключа</td>
          <td>{this.state.TimeCreate}</td>
        </tr>        
        <tr> 
          <td>Владелец ключа</td>
          <td>{this.state.username}</td>
        </tr>        
        <tr> 
          <td>Права</td>
          <td>
          <div>
            <p>Права на чтение</p>
            <p>{this.state.RootR}</p>
            <p>Права на чтение</p>
            <p>{this.state.RootW}</p>
          </div></td>
        </tr>
        </tbody>
      </table>
    </div>)



    return (
      <div className="div">
        {header}
        {Profile}
      </div>
    );
  }
}

export default App;
