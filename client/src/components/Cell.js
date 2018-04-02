import React from 'react'


const Cell = (props) => {
   const { tab, column, currentPiece, KeyDown, endLine} = props
   let test = []
   let color = false
   let end = false
   if (typeof(currentPiece.coord) != 'undefined'){
        currentPiece.coord.map(p => {
            if (tab.id === p.y && column.id == p.x){
                color = true
            }

        })
    }
   let backgroundPiece = ""

   switch(currentPiece.type){
        case 1 : 
            backgroundPiece = "yellow"
            break
        case 2 :
            backgroundPiece = "#00FFFF"
            break
        case 3 :
            backgroundPiece = "#EEE8AA"
            break
        case 4 : 
            backgroundPiece = '#CD853F'
            break
        case 5: 
            backgroundPiece = '#DDA0DD'
            break;
        case 6 : 
            backgroundPiece = '#66CDAA'
            break
        case 7 : 
            backgroundPiece = '#FF69B4'
            break
        case 9 : 
            backgroundPiece = "green"
        default :
            break

    }
   // console.log(endLine)
   for (let i = 0; i < endLine.length; i++){
        if (endLine[i].y === tab.id && endLine[i].x === column.id){
            end = true
        }
   }
    if(end === true){
        test.push(<div key={column.id} style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'red'}} className={tab.id}/>)
    }else if (color === true){
        test.push(<div key={column.id} style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: backgroundPiece}} className={tab.id}/>)
    
    }else{
        test.push(<div key={column.id} style={{width: '2em', height: '2em', border: '1px solid black', backgroundColor: 'white'}} className={tab.id}/>)
        
    }
    return test
}

export default Cell