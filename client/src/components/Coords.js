import PropTypes from 'prop-types'
import React from 'react'


export function coordsObject(prev, nuevo) {
	let coords = [];
	// console.log(prev);
	coords.push(prev);//delete
	coords.push(nuevo);//toadd
	return new Promise((resolve, reject) => {
		for (let i = 0; i < 4; i++) {
			for (let y = 0; y < 4; y++) {
				if (prev[i] && nuevo[y]
					&& (prev[i].x === nuevo[y].x && prev[i].y === nuevo[y].y)) {
					coords[0][i] = null;
					coords[1][y] = null;
				}
			}
		}
		//   console.log("COORDSS:: ", coords);
		resolve(coords);
	});

}


export function giveCoords(piece) {
	return new Promise((resolve, reject) => {
		let p = [];
		if (piece.type === 'carre') {
			p[0] = { x: piece.x, y: piece.y };
			p[1] = { x: piece.x + 1, y: piece.y };
			p[2] = { x: piece.x, y: piece.y + 1 };
			p[3] = { x: piece.x + 1, y: piece.y + 1 };
			resolve(p);
		} else if (piece.type === 'L') {
			p[0] = { x: piece.x, y: piece.y };
			p[1] = { x: piece.x, y: piece.y - 1 };
			p[2] = { x: piece.x, y: piece.y + 1 };
			p[3] = { x: piece.x + 1, y: piece.y + 1 };
			makeRotation(piece, p, 0, piece.rotation).then(newPiece => {
				resolve(newPiece);
			});
		}else if (piece.type === 'ReverseL') {
			p[0] = { x: piece.x, y: piece.y };
			p[1] = { x: piece.x, y: piece.y - 1 };
			p[2] = { x: piece.x, y: piece.y + 1 };
			p[3] = { x: piece.x - 1, y: piece.y + 1 };
			makeRotation(piece, p, 0, piece.rotation).then(newPiece => {
				resolve(newPiece);
			});
		}else if (piece.type === 'Line') {
			p[0] = { x: piece.x, y: piece.y };
			p[1] = { x: piece.x, y: piece.y - 1 };
			p[2] = { x: piece.x, y: piece.y - 2 };
			p[3] = { x: piece.x, y: piece.y + 1 };
			piece.rotation %= 180;
			makeRotation(piece, p, 0, piece.rotation).then(newPiece => {
				resolve(newPiece);
			});
		}else if (piece.type === 'ReverseZ') {
			p[0] = { x: piece.x, y: piece.y };
			p[1] = { x: piece.x + 1, y: piece.y };
			p[2] = { x: piece.x, y: piece.y + 1 };
			p[3] = { x: piece.x - 1, y: piece.y + 1 };
			piece.rotation %= 180;
			makeRotation(piece, p, 0, piece.rotation).then(newPiece => {
				resolve(newPiece);
			});
		}else if (piece.type === 'Z') {
			p[0] = { x: piece.x, y: piece.y };
			p[1] = { x: piece.x - 1, y: piece.y };
			p[2] = { x: piece.x + 1, y: piece.y + 1 };
			p[3] = { x: piece.x, y: piece.y  + 1};
			piece.rotation %= 180;
			makeRotation(piece, p, 0, piece.rotation).then(newPiece => {
				resolve(newPiece);
			});
		}else if (piece.type === 'T') {
			p[0] = { x: piece.x, y: piece.y };
			p[1] = { x: piece.x + 1, y: piece.y };
			p[2] = { x: piece.x, y: piece.y - 1 };
			p[3] = { x: piece.x - 1, y: piece.y };
			makeRotation(piece, p, 0, piece.rotation).then(newPiece => {
				resolve(newPiece);
			});
		}
		else if (piece.type) {
			resolve(null)
		}
	})
}

export function makeRotation(piece, coords, from, to) {
	//return de coords...

	return new Promise((resolve, reject) => {
		// piece.x, piece.y
		// console.log(coords);
		let newPiece = [];
		newPiece.push({ x: piece.x, y: piece.y })
		newPiece.push(coords[1]);
		newPiece.push(coords[2]);
		newPiece.push(coords[3]);
		for (let rotation = from; rotation != to; rotation = (rotation + 90) % 360) {
			for (let i = 1; i < coords.length; i++) {
				if (newPiece[i] && newPiece[i].x === piece.x - 1 && newPiece[i].y === piece.y - 1)
					newPiece[i] = { x: piece.x - 1, y: piece.y + 1 };
				else if (newPiece[i] && newPiece[i].x === piece.x - 1 && newPiece[i].y === piece.y)
					newPiece[i] = { x: piece.x, y: piece.y + 1 };
				else if (newPiece[i] && newPiece[i].x === piece.x - 1 && newPiece[i].y === piece.y + 1)
					newPiece[i] = { x: piece.x + 1, y: piece.y + 1 };
				else if (newPiece[i] && newPiece[i].x === piece.x && newPiece[i].y === piece.y - 1)
					newPiece[i] = { x: piece.x - 1, y: piece.y };
				else if (newPiece[i] && newPiece[i].x === piece.x && newPiece[i].y === piece.y + 1)
					newPiece[i] = { x: piece.x + 1, y: piece.y };
				else if (newPiece[i] && newPiece[i].x === piece.x + 1 && newPiece[i].y === piece.y - 1)
					newPiece[i] = { x: piece.x - 1, y: piece.y - 1 };
				else if (newPiece[i] && newPiece[i].x === piece.x + 1 && newPiece[i].y === piece.y)
					newPiece[i] = { x: piece.x, y: piece.y - 1 };
				else if (newPiece[i] && newPiece[i].x === piece.x + 1 && newPiece[i].y === piece.y + 1)
					newPiece[i] = { x: piece.x + 1, y: piece.y - 1 };
				else if (newPiece[i] && newPiece[i].x === piece.x && newPiece[i].y === piece.y)
					newPiece[i] = { x: piece.x, y: piece.y };
				else if (newPiece[i] && newPiece[i].x === piece.x && newPiece[i].y === piece.y - 2)
					newPiece[i] = { x: piece.x - 2, y: piece.y };
				else if (newPiece[i] && newPiece[i].x === piece.x - 2 && newPiece[i].y === piece.y)
					newPiece[i] = { x: piece.x, y: piece.y - 2};
				else
					newPiece[i] = { x: piece.x, y: piece.y };
			}
		}
		// rotateP.coords.push(newPiece[0]);
		// rotateP.coords.push(newPiece[1]);
		// rotateP.coords.push(newPiece[2]);
		// rotateP.coords.push(newPiece[3]);
		// rotateP.rotation = (piece.rotation + 90) % 360;
		console.log(newPiece);
		resolve(newPiece);
	});
}

// export function notInThisPiece(piece, coords) {
// 	for (let i = 0; i < 4; i++) {
// 		if (piece[i].x === coords.x && piece[i].y === coords.y)
// 			return -1;
// 	}
// 	return 1;
// }

export function isOk(toAdd, table) {
	// table.cols[piece.y - 1].lines[piece.x];
	//carre
	return new Promise((resolve, reject) => {

		if (toAdd) {
			// console.log("ISOK", toAdd);
			for (let i = 0; i < 4; i++) {
				if (toAdd[i] != null){
					if (toAdd[i].x < 0 || toAdd[i].x > 9 || toAdd[i].y < 0 || toAdd[i].y > 19){
						resolve(-1);
					}else if (table.cols[toAdd[i].x].lines[toAdd[i].y].className !== ""){
						resolve(-1);
					}
				}
			}
			resolve(1);
		}
		resolve(-1);
	});
}

export function pieceMove(table, piecePrev, pieceNew) {
	return new Promise((resolve, reject) => {
		let tableNew = Object.assign({}, table);
		// console.log("piecessssssss:", pieceNew, piecePrev)
		// console.log(piecePrev.coords, pieceNew);
		coordsObject(piecePrev.coords, pieceNew).then(coords => {
			// console.log("ENDDD:::", coords);
			isOk(coords[1], table).then(ok => {
				if (ok == -1) {
					resolve(null);
				} else {
					for (let i = 0; i < 4; i++) {
						if (coords[0][i])
							tableNew.cols[coords[0][i].x].lines[coords[0][i].y].className = '';
						if (coords[1][i])
							tableNew.cols[coords[1][i].x].lines[coords[1][i].y].className = piecePrev.className;
					}
					// console.log("tableNew",tableNew);
					resolve(tableNew);
				}

			})

		})
	})
}
