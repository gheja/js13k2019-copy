"use strict";

let _levels = [
	{
		"width": 10, // tiles
		"height": 10, // tiles == walls.length / width (TODO: remove?)
		"walls":
"1111111111\
1111111001\
1100000001\
1100111111\
1111111111\
1001100001\
1011100001\
1011101101\
1000000001\
1111111111",
		"roomMap":
"0000000000\
0000000000\
0000000000\
0000000000\
0000000000\
1111111111\
1111111111\
1111111111\
1111111111\
1111111111",
		"times": [
			[ 300, 1 ], // [ length, offset ]
			[ 300, 1 ]
		],
		"objects": [
			[ OBJ_STARTPOINT, 8, 2 ], // [ type, x, y, (optional parameters) ]
			[ OBJ_STARTPOINT, 6, 6 ],
			[ OBJ_DOOR, 4, 8, 1 ],
			[ OBJ_SWITCH, 2, 3, 1, 0, 0 ],
			[ OBJ_GOAL, 2, 5 ]
		]
	}
];

let _shapes = [
	{
		"points":[
			[20,0,20,3],
			[35,10,26,12],
			[30,27,25,21],
			[10,27,14,21],
			[5,10,14,12],
			[20,0,20,3]
		],
		"lineWidth":2,
		"lineColor":"eb0",
		"fillColor":"fe0",
		"padX": 10,
		"padY": 6
	}, // SHAPE_STAR
	
];
