import PropTypes from 'prop-types'
import React, { Component } from 'react';
import Confetti from './../../node_modules/react-confetti'
import ReactDOM from 'react-dom'
import sizeMe from 'react-sizeme'
 
const Confettii = sizeMe({
  monitorHeight: true,
  monitorWidth: true,
})(class Example extends React.PureComponent {
  static propTypes = {
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }
  render() {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Confetti {...this.props.size} />
      </div>
    )
  }
})

export default Confettii