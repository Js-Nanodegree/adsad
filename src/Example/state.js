import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.addToken = this.addToken.bind(this)
    this.state = {
      popupVisible: false
    }
  }

  addToken() {this.setState({popupVisible: true})
  }

  render() {
    return (
      <div>
        <button onClick={this.addToken}>Toggle Popover</button>
        {this.state.popupVisible && (
          <div className="popover">I'm a popover!</div>
        )}
      </div>
    )
  }
}

export default App;
