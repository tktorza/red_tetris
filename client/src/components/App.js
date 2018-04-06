import React, { Component } from 'react';
import Button from '../containers/ButtonContainer'
import AddUserContainer from '../containers/AddUserContainer'
import Confettii from './Confetti'
import Boule from './Boule'

const Background = (props) =>{
  const {position, onClick} = props
  let table = []
  let final = 0
  for (let i=0;final < window.innerWidth;i++){
    let n = Math.floor(Math.random() * 100) + 1;
    let margin = Math.floor(Math.random() * 10) + 10;
    table.push(<Boule key={i} size={n} margin={margin} marginTop={position == 0 ? "boule-bottom" : ""}/>)
    final+= (n + margin)
  }

  return (<div onClick={onClick} className={"App-center-background"}>
            {table}
          </div>)
}


class App extends Component {
  constructor(props){
    super(props)
    this.state = {position: 0};
  }

  onClickBack = () => {
    this.setState({position: this.state.position^1});
  }

  render() {
    return (
      <div className="App">
      {/* <Confettii /> */}
      <div className="App-center">
        <AddUserContainer />
      </div>
        
       <Button path="/home" />
        <Background onClick={this.onClickBack} position={this.state.position}/>
      </div>
    );
  }
}

export default App;
