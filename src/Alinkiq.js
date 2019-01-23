import React,{Component} from 'react'


export default class CarList extends Component{
    render(){
        return(
        <div>
          <button onClick={() => { this.props.updateData(this.state.name)}}>Запустить бумеранг</button>
        </div>)
      }
  }
  
