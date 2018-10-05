
const type = [
	{
		type : 1,
		coord : [
					{ x : 4, y : -2 },
					{ x : 5, y : -2 },
					{ x : 4, y : -1 },
					{ x : 5, y : -1 }
				]
	},
	{
		type : 2,
		coord : [
					{ x : 4, y : -3 },	
					{ x : 4, y : -2 },	
					{ x : 4, y : -1 },	
					{ x : 5, y : -1 }
				]	
	},
	{
		type : 3,
		coord : [
					{ x : 4, y : -3 },
					{ x : 4, y : -2 },
					{ x : 4, y : -1 },
					{ x : 3, y : -1 }
				]
	},
	{	
		type : 4,
		coord : [
					{ x : 4, y : -2 },
					{ x : 4, y : -1 },
					{ x : 5, y : -2 },
					{ x : 3, y : -1 }
				]
	},
	{
		type : 5,
		coord : [
					{ x : 4, y : -2 },
					{ x : 4, y : -1 },
					{ x : 3, y : -2 },
					{ x : 5, y : -1 }
				]	
	},
	{
		type : 6,
		coord : [
					{ x : 5, y : -1 },
					{ x : 4, y : -1 },
					{ x : 4, y : -2 },
					{ x : 3, y : -1 }
				]
	},
	{	
		type : 7,
		coord : [
			{ x : 4, y : -4 },
			{ x : 4, y : -2 },
			{ x : 4, y : -3 },
			{ x : 4, y : -1 }
		]
	}
]


module.exports = class Piece {
	constructor (){
		this.piece = type[Math.floor(Math.random() * 7)]
	}
}

