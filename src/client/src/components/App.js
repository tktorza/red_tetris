import React, { Component } from 'react';
import Button from '../containers/ButtonContainer'
import AddUserContainer from '../containers/AddUserContainer'
import Confettii from './Confetti'
import Boule, {tableColor} from './Boule'
import store  from '../index'

const Background = (props) =>{
  const {position, onClick} = props
  let table = []
  let final = 0
  for (let i=0;final < window.innerWidth;i++){
    let n = Math.floor(Math.random() * 100) + 1;
    let margin = (i == 0 ? 0 : Math.floor(Math.random() * 10) + 10);
    // marginTop={position == 0 ? "boule-bottom" : ""}
    table.push(<Boule key={i} size={n} margin={margin} />)
    final+= (n + margin)
  }

  return (<div onClick={onClick} className={"App-center-background"}>
            {table}
          </div>)
}

const SpaceSky = () => (
  <div>
  <div className="stars" >
</div>
<div className="twinkling"></div>
<div className="clouds"></div>
</div>
)


class App extends Component {
  constructor(props){
    super(props)
    let table = []
    let final = 0
    for (let i=0;final < window.innerWidth;i++){
      let n = Math.floor(Math.random() * 100) + 5;
      let margin = (i == 0 ? 0 : Math.floor(Math.random() * 10) + 10);
      let degre = (Math.random() *1000) % 360;
      table.push({key: i, n: n, margin: margin, spaceColor: 'linear-gradient('+(degre % 2 == 0 ? '+' : '-')+degre+'deg, rgb('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+'), rgb('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+'))',
        color: 'rgb('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+')'
      })
      final+= (n + margin)
    }
    this.state = {position: 1, table: table, final: final};
  }

  componentDidMount = () =>{
    document.onkeydown = (evt) => {
      evt = evt || window.event;
      if (evt.key == '*'){
        this.onClickBack()
      }
    }
  }

  onClickBack = () => {
    this.setState({position: this.state.position^1});
  }

  render() {
    return (
      <div className={this.state.position == 1 ? "App" : "Gravity-App"}>
      {this.state.position == 0 ? <SpaceSky /> : null}
      {/* <Confettii /> */}
      <div className="App-center">
        <AddUserContainer gravity={this.state.position}/>
      </div>
       <div className={"App-center-background"}>
       {this.state.table.map((object, key) =>
          (
          <Boule 
            key={key} 
            style = {{
              width: object.n,
              height: object.n,
              marginLeft: object.margin, 
              background: (this.state.position == 1 ? object.color : object.spaceColor),
              marginTop: this.state.position == 0 ? '0px' : (window.innerHeight-object.n)+'px',
              transition: 'margin-top '+(object.n < 11 ? '2.'+object.n : object.n/10)+'s linear'
            }} 
            />
          )
       )}
          {/* <Background onClick={} position={this.state.position}/> */}
        </div>
      </div>
    );
  }
}

export default App;
