
const type = [
	{
		type : 1,
		coord : [
					{ x : 4, y : -1 },
					{ x : 5, y : -1 },
					{ x : 4, y : 0 },
					{ x : 5, y : 0 }
				]
	},
	{
		type : 2,
		coord : [
					{ x : 4, y : -1 },	
					{ x : 4, y : 0 },	
					{ x : 4, y : 1 },	
					{ x : 5, y : 1 }
				]	
	},
	{
		type : 3,
		coord : [
					{ x : 4, y : -1 },
					{ x : 4, y : 0 },
					{ x : 4, y : 1 },
					{ x : 3, y : 1 }
				]
	},
	{	
		type : 4,
		coord : [
					{ x : 4, y : -1 },
					{ x : 4, y : 0 },
					{ x : 5, y : -1 },
					{ x : 3, y : 0 }
				]
	},
	{
		type : 5,
		coord : [
					{ x : 4, y : -1 },
					{ x : 4, y : 0 },
					{ x : 3, y : -1 },
					{ x : 5, y : 0 }
				]	
	},
	{
		type : 6,
		coord : [
					{ x : 5, y : 0 },
					{ x : 4, y : 0 },
					{ x : 4, y : -1 },
					{ x : 3, y : 0 }
				]
	},
	{	
		type : 7,
		coord : [
			{ x : 4, y : -1 },
			{ x : 4, y : 1 },
			{ x : 4, y : 0 },
			{ x : 4, y : 2 }
		]
	}
]


module.exports = class Piece {
	constructor (){
		// this.piece = type[1]
		this.piece = type[Math.floor(Math.random() * 6)]
		//this.calculeRotate(Math.floor(Math.random() * 3)) 
	}

	get Piece (){
		return this.piece
	}

	calculeRotate(){
		// for (let j = 0; j <= nb; j++){
			if (this.piece.type != 1){
				for (let i = 0; i < this.piece.coord.length; i++){
					if (i != 1){
						let new_x =(this.piece.coord[i].x - this.piece.coord[1].x)
						let new_y =(this.piece.coord[i].y - this.piece.coord[1].y)
		 				let X = Math.round(new_x * Math.cos(Math.PI / 2) - new_y * Math.sin(Math.PI / 2) + this.piece.coord[1].x)
		 				let Y = Math.round(new_x * Math.sin(Math.PI / 2) + new_y * Math.cos(Math.PI / 2) + this.piece.coord[1].y)
		 				this.piece.coord[i].x = X
		 				this.piece.coord[i].y = Y
		 			}	
				}
		}
	}
}

// const test = new Piece()
// console.log(test.Piece)

