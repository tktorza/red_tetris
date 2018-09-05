import React from 'react'

const OtherPlayerCell = (props) => {
     const { tab, column, endLine} = props
     let test = []
     let end = false
     for (let i = 0; i < endLine.length; i++){
          if (endLine[i].y === tab.id && endLine[i].x === column.id){
              end = true
          }
     }
    if(end === true){
        return(<div key={column.id} style={{width: '0.7em', height: '0.7em', border: '1px solid black', backgroundColor: 'red'}} className={tab.id}/>)
    }else{
        return(<div key={column.id} style={{width: '0.7em', height: '0.7em', border: '1px solid black', backgroundColor: 'white'}} className={tab.id}/>)
        
    }
    // return test
}

export default OtherPlayerCell