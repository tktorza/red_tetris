import { sendMalus , upScore , getMorePiece, getNextPiece, getCurrentPiece} from './actions/action'

export const getLowerCoord = (piece) => {
    let tmpValue = -1

    piece.map(p => {
        if (p.y > tmpValue){
            tmpValue = p.y
        }
    })
    return tmpValue
}

export const getLowerDist = (piece, coord, difference)=>{
    let tmp = 20
    piece.coord.map(elemt => {
        if (elemt.x == coord.x && coord.y > elemt.y){
            if (coord.y - elemt.y - 1  < difference){

                difference = coord.y - elemt.y - 1
            }
        }
    })
    return difference
}

export const getMoove = (currentPiece, key, endLine) => {
    let moove = {} 
    let newPose = {type : currentPiece.type, coord : []}
    switch (key.key) {
        case "ArrowLeft":
                currentPiece.coord.map(p => {
                    newPose.coord.push({x : p.x - 1, y : p.y})
                })
                moove = {moove : "left", newPose : newPose}
                break
        case "ArrowRight" : 
            currentPiece.coord.map(p => {
                newPose.coord.push({x : p.x +1, y : p.y})
            })
            moove = {moove : "right", newPose : newPose}
            break
        case "ArrowUp":
            newPose = Object.assign({}, calculeRotate(currentPiece, endLine))
            moove = {moove : "up", newPose : newPose}
            
            break
        case "ArrowDown":
            currentPiece.coord.map(p => {
                newPose.coord.push({x : p.x, y : p.y + 1})
            })
            moove = {moove : "down", newPose : newPose}
            break
    }
    return moove
}

export const calculDown = (piece, endLine) => {
       let newEndLine = []
      
       let difference = 19 - getLowerCoord(piece.coord)
       let i
        endLine.map(e => {
            i = getLowerDist(piece, e, difference)
            if (difference > i){
                difference = i
            }
        })
        piece.coord.forEach(elem => {
            endLine.push({x : elem.x, y : elem.y + difference})
        })

        return (endLine) 
        
    
}

export const isLoose = (table) => {
    let i = 0

    table.forEach( (elem) => {
        if (elem.y < 0){
            i++
        }
    });
    if (i  == 0)
        return false
    else{
        return true
    }
}

export const getNewEndLine = (table, dispatch, gameId, malus) => {
    let tmptab = []
    let maluslength = 0
    for (let i = 0; i < table.length; i++){
        tmptab = table.filter(filtre => {
            if (filtre.y < 20 - malus)
                return (filtre.y == table[i].y)
        })
        if (tmptab.length == 10){
            maluslength += 1
            if (maluslength > 1){
                console.log("malus === ", maluslength)
                dispatch(sendMalus(gameId))
            }
            dispatch(upScore())
            table = table.filter(remove => {
                return (remove.y != tmptab[0].y)
            })
            table.forEach(item => {
                if (item.y < tmptab[0].y){
                    item.y += 1
                }
          })
            tmptab = []
        }
    }
    return (table)
}

export const getSideBlock = (piece, endLine, type) => {
    let i = 0
    endLine.forEach(coord => {
        if (coord.x == piece.x - 1 && coord.y == piece.y){
            i = coord.x
        }else if (coord.x == piece.x + 1 && coord.y == piece.y){
            i = coord.x
        }else if (coord.x == piece.x + 2 && coord.y == piece.y && type == 7){
            i = coord.x
        }else if (coord.x == piece.x - 2 && coord.y == piece.y && type == 7){
            i = coord.x
        }
    })
    return i
}

export const getDecale = (piece, endLine) => {
    let decale = 0
    let sideLock = getSideBlock(piece.coord[1], endLine, piece.type)
    switch (piece.type){
            case 7 :
                if (piece.coord[1].x == 0 && piece.coord[2].y > piece.coord[1].y){
                    return 2
                }
                else if (piece.coord[1].x == 0 && piece.coord[2].y < piece.coord[1].y || piece.coord[1].x == 1 && piece.coord[2].y > piece.coord[1].y){
                    return 1
                }
                else if (piece.coord[1].x == 9 && piece.coord[2].y > piece.coord[1].y || piece.coord[1].x == 8   && piece.coord[2].y < piece.coord[1].y){
                    return -1
                }
                else if (piece.coord[1].x == 9 && piece.coord[2].y < piece.coord[1].y ){
                    return -2
                }else if (sideLock + 1 == piece.coord[1].x && piece.coord[2].y > piece.coord[1].y && sideLock > 0){
                    return 2
                }else if (sideLock + 1 == piece.coord[1].x &&  piece.coord[2].y < piece.coord[1].y || sideLock + 2 == piece.coord[1].x && piece.coord[2].y > piece.coord[1].y && sideLock > 0 ){
                    return 1
                } else if (piece.coord[1].x == sideLock -1 && piece.coord[2].y > piece.coord[1].y || piece.coord[1].x == sideLock - 2 && piece.coord[2].y < piece.coord[1].y && sideLock > 0){
                    return -1
                }else if (piece.coord[1].x == sideLock - 1 && piece.coord[2].y < piece.coord[1].y && sideLock > 0 ){
                    return -2
                }
            default : 
                if (piece.coord[1].x == 0){
                    return 1
                }
                else if (piece.coord[1].x == 9){
                    return -1
                }else if (sideLock + 1 == piece.coord[1].x && sideLock > 0){
                    return 1
                }else if (sideLock - 1 == piece.coord[1].x && sideLock > 0){
                    return -1
                }
    }
    return decale
}

export const calculeRotate = (piece, endLine) =>{
        if (piece.type != 1){
                let newPiece = {type : piece.type, coord : []}
                let tmp_pos = {}
                let decale = getDecale(piece, endLine)
            for (let i = 0; i < piece.coord.length; i++){
                if (i != 1){
                    let new_x =(piece.coord[i].x  - piece.coord[1].x )
                    let new_y =(piece.coord[i].y - piece.coord[1].y)
                    let X = Math.round(new_x * Math.cos(Math.PI / 2) - new_y * Math.sin(Math.PI / 2) + piece.coord[1].x) +decale
                    let Y = Math.round(new_x * Math.sin(Math.PI / 2) + new_y * Math.cos(Math.PI / 2) + piece.coord[1].y)
                    tmp_pos = { x : X, y : Y }
                }else{
                    tmp_pos = { x : piece.coord[i].x + decale, y : piece.coord[i].y}
                }
                newPiece.coord.push(tmp_pos)
                tmp_pos = {} 
            }
            return newPiece
        }else{
            return piece
        }
}

export const isPossible = (piece, move, endLine) => {
    let i = 0
    let x, y

    if (endLine.length > 0){
        switch (move){
            case 'down' :
                x = 0
                y = 1
                endLine.forEach(item => {
                    piece.coord.forEach(p => {
                        if (item.x == p.x && item.y == p.y + 1 || p.y === 19)
                            i++
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break
            default :
                endLine.forEach(item => {
                    piece.coord.forEach(p => {
                        if (item.x == p.x  && item.y == p.y)
                            i++
                        if (p.x < 0 || p.x > 9)
                            i++
                    })
                })
                break

        }
    }else{
        piece.coord.forEach(p => {
                if (19 <= p.y)
                    i++
                if (p.x < 0 || p.x > 9)
                    i++
            })
    }
    return i 
}

export const getNewPiece = (gameId, nextPiece, dispatch) => {
    let newPiece = nextPiece.shift()

    if (nextPiece.length == 0){
        dispatch(getMorePiece(gameId))
    }
    else{
        dispatch(getNextPiece(nextPiece))
    }
    dispatch(getCurrentPiece(newPiece))
}