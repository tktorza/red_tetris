import React, { Component } from 'react';
import Button from '../containers/ButtonContainer'
import AddUserContainer from '../containers/AddUserContainer'


class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="App-center">
        <AddUserContainer />
      </div>
        
       <Button path="/home" />
      </div>
    );
  }
}

export default App;
