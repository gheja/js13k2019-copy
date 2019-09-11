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
	 // SHAPE_STAR
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
	},
	
// body front
{"points":[
[10,10,5,5],
[40,10,45,5],
[40,25,50,30],
[40,37,40,50],
[10,37,10,50],
[10,25,0,30],
[10,10,5,5]
],"lineWidth":2,"lineColor":"ddd7bb","fillColor":"fffacc"},

// body front v2
{"points":[
[10,5,5,0],
[40,5,45,0],
[40,25,50,30],
[40,37,46,50],
[10,37,4,50],
[10,25,0,30],
[10,5,5,0]
],"lineWidth":2,"lineColor":"ddd7bb","fillColor":"fffacc"},

// eye
{"points":[
[20,20,10,10],
[30,20,40,10],
[30,30,40,40],
[20,30,10,40],
[20,20,10,10]
],"lineWidth":5,"lineColor":"333","fillColor":"222"},

// eye
{"points":[
[20,20,10,10],
[30,20,40,10],
[30,30,40,40],
[20,30,10,40],
[20,20,10,10]
],"lineWidth":5,"lineColor":"333","fillColor":"222"},

// eye anim 1
{"points":[
[10,30,20,20],
[40,28,30,20]
],"lineWidth":5,"lineColor":"333"},

// eye anim 2
{"points":[
[7,30,20,25],
[43,28,30,25]
],"lineWidth":5,"lineColor":"333"},

// mouth
{"points":[
[15,32,20,40],
[35,28,35,35]
],"lineWidth":5,"lineColor":"333"},

// leg front
{"points":[
[25,25,26,30],
[23,45,20,40]
],"lineWidth":5,"lineColor":"333"},

// leg anim 1
{"points":[
[25,25,10,30],
[20,38,20,40]
],"lineWidth":5,"lineColor":"333"},

// leg anim 2
{"points":[
[25,25,20,30],
[30,40,20,35]
],"lineWidth":5,"lineColor":"333"},

// leg anim 3
{"points":[
[25,25,30,30],
[45,35,30,30]
],"lineWidth":5,"lineColor":"333"},

// body left
{"points":[
[10,5,5,0],
[25,5,20,5],
[30,15,35,10],
[30,37,36,50],
[15,37,15,40],
[15,25,6,30],
[10,5,5,5]
],"lineWidth":2,"lineColor":"ddd7bb","fillColor":"fffacc"}

];
