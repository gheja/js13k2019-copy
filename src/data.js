"use strict";

let _levels = [
	{
		"width": 10, // tiles
		"height": 10, // tiles == walls.length / width (TODO: remove?)
		"walls":
"1111111111\
1111100001\
1000000001\
1000011111\
1111111111\
1000000001\
1000000001\
1011000001\
1011110001\
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
			[ 120, 1 ], // [ length, offset ]
			[ 120, 1 ]
		],
		"objects": [
			[ OBJ_STARTPOINT, 8, 2 ], // [ type, x, y, (optional parameters) ]
			[ OBJ_STARTPOINT, 8, 8 ]
		]
	}
];
