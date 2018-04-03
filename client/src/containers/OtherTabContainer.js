import OtherTable from '../components/OtherTable'
import  store  from '../index'
import { connect } from 'react-redux'

import { } from '../action/action'

const mapStateToProps = (state) => {
        return  { 
        	player : state.otherTableReducer.toJS()
        }
  

}

const mapDispatchToProps = (dispatch) => {
   return {
   }
}

const OtherTableContainers = connect(
        mapStateToProps,
        mapDispatchToProps
)(OtherTable)

export default OtherTableContainers