import React, { Component } from 'react';
import Button from '../containers/ButtonContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Button path="/home" />
      </div>
    );
  }
}

export default App;
