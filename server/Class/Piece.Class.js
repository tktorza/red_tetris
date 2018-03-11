
const type = [
	{
		type : 1,
		coord : [
					{ x : 4, y : 1 },
					{ x : 5, y : 1 },
					{ x : 4, y : 2 },
					{ x : 5, y : 2 }
				]
	},
	{
		type : 2,
		coord : [
					{ x : 4, y : 0 },	
					{ x : 4, y : 1 },	
					{ x : 4, y : 2 },	
					{ x : 5, y : 2 }
				]	
	},
	{
		type : 3,
		coord : [
					{ x : 4, y : 0 },
					{ x : 4, y : 1 },
					{ x : 4, y : 2 },
					{ x : 3, y : 2 }
				]
	},
	{	
		type : 4,
		coord : [
					{ x : 4, y : 0 },
					{ x : 4, y : 1 },
					{ x : 5, y : 0 },
					{ x : 3, y : 1 }
				]
	},
	{
		type : 5,
		coord : [
					{ x : 4, y : 0 },
					{ x : 4, y : 1 },
					{ x : 3, y : 0 },
					{ x : 5, y : 1 }
				]	
	},
	{
		type : 6,
		coord : [
					{ x : 5, y : 1 },
					{ x : 4, y : 1 },
					{ x : 4, y : 0 },
					{ x : 3, y : 1 }
				]
	},
	{	
		type : 7,
		coord : [
			{ x : 4, y : 0 },
			{ x : 4, y : 2 },
			{ x : 4, y : 1 },
			{ x : 4, y : 3 }
		]
	}
]


module.exports = class Piece {
	constructor (){
		// this.piece = type[1]
		this.piece = type[Math.floor(Math.random() * 6)]
		this.calculeRotate(Math.floor(Math.random() * 3)) 
	}

	get Piece (){
		return this.piece
	}

	calculeRotate(nb){
		for (let j = 0; j <= nb; j++){
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

	async moveLeft(){
		let j = 0
		for (let i = 0; i < this.piece.coord.lenght; i++){
			if (this.piece.coord[i].x - 1 < 0){
				j = 1
				break;
			}else{
				this.piece.coord[i].x -= 1
			}
		}
		return j
	}

	async moveRight(){
		let j = 0
		for (let i = 0; i < this.piece.coord.lenght; i++){
			if (this.piece.coord[i].x + 1 > 9){
				j = 1
				break;
			}
			else{
				this.piece.coord[i].x += 1
			}
		}
		return j
	}

	async moveDown(){
		let j = 0
		for (let i = 0; i < this.piece.coord.lenght; i++){
			if (this.piece.coord[i].y + 1 > 19){
				j = 1
				break;
			}else{
				this.piece.coord[i].y += 1
			}
		}
		return j
	}
}

// const test = new Piece()
// console.log(test.Piece)

