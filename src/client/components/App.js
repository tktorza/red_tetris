import Button from '../containers/ButtonContainer'
import AddUserContainer from '../containers/AddUserContainer'
// import Confettii from './Confetti'
// import Boule, {tableColor} from './Boule'
import store  from '../index'
import React from 'react'
import {styles} from '../styles'


const App = (props) => {
	
  return (
    <div style={styles.AppCenter}>
      		<AddUserContainer />
          
    </div>
  );
}



export default App;
