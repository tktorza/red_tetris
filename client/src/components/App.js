import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import AddUser from '../containers/AddUser'
import UserList from '../containers/UserList'
import Connected  from './Connected'
// import { pushUser } from './actions/index';
import { newPiece } from '../actions'


function Center(props) {
  const isLoggedIn = props.state.users[0] ? 1 : null;
  if (!isLoggedIn) {
    return <AddUser />;
  }
  return <Connected user={props.state.users[0].text}/>;
}

const App = (state, dispatch) => {
  if(!state.piece[0]){
    state.dispatch(newPiece({
    type: 0,
    x: 4,
    y: 0,
    rotation: 0,
    className: "color-blue"
}));}
  return (
  
  <div className="App">
    {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header> */}
    <div className="App-center">
    <Center state={state} />
    {/* <UserList /> */}
      {/* <User actionKey={(value) => pushUser(value)} /> */}
    </div>
  </div>
)}

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
      <User pushUser={pushUser}/>
        </p>
      </div>
    );
  }
}
*/


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
