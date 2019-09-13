"use strict";

let _levels = [
/*
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
			[ 300, 1, 7, 1 ], // [ length, offset, clock x, clock y ]
			[ 300, 1, 7, 5 ]
		],
		"objects": [
			[ OBJ_STARTPOINT, 8, 2 ], // [ type, x, y, (optional parameters) ]
			[ OBJ_STARTPOINT, 6, 6 ],
			[ OBJ_DOOR, 4, 8, 1 ],
			[ OBJ_SWITCH, 2, 3, 1, 0, 0 ],
			[ OBJ_GOAL, 2, 5 ]
		]
	},
*/
	{"width":10,"height":10,"walls":"0011110111100100000001111011110100111001010000000101000000010110000011111111111011001000001110110000","roomMap":"1111111111111111111111111111111000111001100000000110000000011000000001110000000111111111111111111111","times":[[140,1,7,3]],"objects":[[0,7,6],[3,3,6]]},
	{"width":10,"height":10,"walls":"1111111110100000011010000000111000000011100000111111111111001100000111000011111000100001111111011110","roomMap":"0000000000000000000000000000000000000000000000000000000001111111111111111111101111111110111111111011","times":[[180,1,3,1]],"objects":[[0,6,3],[3,2,2]]},
	{"width":10,"height":10,"walls":"1111111111111001110111100000011111110111111111111110011000011011100001101111100110000000011111111111","roomMap":"0000000000000000000000000000000000000000000000000011111111111111111111111111111111111111111111111111","times":[[400,1,3,1],[400,1,7,5]],"objects":[[0,8,2],[0,6,6],[1,4,8,1],[2,6,3,1,0,0],[3,2,5],[4,1,8,1],[4,3,8,4],[4,5,2,4],[4,6,2,4],[4,7,2,4],[4,8,2,4],[3,3,2]]},
	{"width":10,"height":10,"walls":"0011111100111100011101010001010101000001010000000101000000010110000001011111111101001000110110110010","roomMap":"1111111111111000000111000000011000000001100000000110000000011000000001110000000111111111111111111111","times":[[140,1,7,3]],"objects":[[0,7,6],[3,5,2]]}
];

const _svgs = [
// SVG_PLAYER_FRONT_BODY = 0
'<path d="m21 12c0-9 57-15 58 5 1 20 7 53-2 62s-37 8-52 2c-14-6-4-60-3-69z" fill="#f0e0d1" stroke="#917c6f"/>\
<path d="m26 18c19 11 43 0 48 0" fill="none" stroke="#917c6f"/>\
<path d="m45 47c7 5 12-0 14-1" stroke="#483e37"/>\
<path d="m20 46c-5 0-13 14-13 22" stroke="#000"/>\
<path d="m79 44c5 1 12 13 13 24" stroke="#000"/>\
<path d="m39 78c0 7-0 12-3 19" stroke="#000"/>\
<path d="m63 77c1 9 0 14 1 20" stroke="#000"/>',

// SVG_PLAYER_FRONT_EYES = 1
// '<path transform="matrix(.75 0 0 .75 36 11)" d="m39 31a3 3 0 1 1 -6 0 3 3 0 1 1 6 0z" fill="#483e37" stroke="#483e37"/>\
// <path transform="matrix(.75 0 0 .75 10 12)" d="m39 31a3 3 0 1 1 -6 0 3 3 0 1 1 6 0z" fill="#483e37" stroke="#483e37"/>',
'<circle cx="63" cy="35" r="2" stroke="#483e37"/>\
<circle cx="38" cy="35" r="2" stroke="#483e37"/>',

// SVG_PLAYER_FRONT_EYES_BLINK = 2
'<path d="m28 39c5-4 8-5 14-1" stroke="#483e37"/>\
<path d="m58 37c5-4 7-2 13 1" stroke="#483e37"/>',

// SVG_STAR
'<path transform="matrix(.44 .11 -.11 .44 44 50)" d="m25 29c-6 3-14 29-21 28-7-0-8-28-13-33-5-4-32-4-33-11-1-7 24-16 27-22 3-6-5-32 0-35 6-3 23 17 30 18 7 0 28-15 34-10 5 4-9 27-8 34 1 7 23 22 20 29-3 6-29-0-35 2z" fill="#fd5" stroke="#fc0"/>',

// SVG_PLAYER_LEFT_BODY
'<path d="m27 13c2-8 46-9 41 10-4 19-3 17 0 40 4 23-31 22-43 11-11-10-1-53 1-62z" fill="#f0e0d1" stroke="#917c6f"/>\
<path d="m34 18c19 10 28 4 32 1" fill="none" stroke="#917c6f"/>\
<path d="m24 46c5 0 8-2 9-4" stroke="#483e37"/>\
<path transform="matrix(.7 .2 -.2 .7 14 -.23)" d="m39 31a3 3 0 1 1 -6 0 3 3 0 1 1 6 0z" fill="#483e37" stroke="#483e37"/>\
<path d="m49 52c6 1 16 3 26 10" stroke="#000"/>',

// SVG_PLAYER_LEFT_LEGS_RUN1
'<path d="m37 75c-5-1-19 3-11 20" fill="none" stroke="#000"/>\
<path d="m52 88c0 3 6 4 12 5" stroke="#000"/>',

// SVG_PLAYER_LEFT_LEGS_RUN2
'<path d="m40 77c-5-1-11 8-1 20" fill="none" stroke="#000"/>\
<path d="m48 87c-2-0-8 3-0 5" stroke="#000"/>',

// SVG_PLAYER_LEFT_LEGS_FLYING = 7
'<path d="m54 87c3 3 10 3 15 3" fill="none" stroke="#000"/>\
<path d="m52 78c6 6 15 5 28 6" stroke="#000"/>',

// SVG_SWITCH_OFF
'<path d="m5 63h55l33-20-57-0z" fill="#333" stroke="#333"/>\
<path d="m10 57h49l29-18-51-0z" fill="#888" stroke="#888"/>',

// SVG_SWITCH_ON
'<path d="m5 63h55l33-20-57-0z" fill="#F83" stroke="#F83"/>\
<path d="m10 57h49l29-18-51-0z" fill="#888" stroke="#888"/>',

// SVG_DOOR_CLOSED
'<path d="m36 33 0 63 30-20 0-63z" fill="#a40" stroke="#803300"/>',

// SVG_DOOR_OPEN
'<path d="m36 97 30-20z" fill="none" stroke="#00000066"/>\
<path d="m31 13 0 63 35-0 0-63z" fill="#803300" stroke="#520"/>',

// SVG_SPIKE_FLOOR
'<path d="m21 93 9-7 7 7 7-12 5 14 8-9 6 8 3-14 9 13" fill="none" stroke="#ffe680"/>',

// SVG_SPIKE_LEFT
'<path d="m10 21 13 9-12 9 16 4-14 9 14 3-12 11 11 4-14 11" fill="none" stroke="#ffe680"/>',

// SVG_SPIKE_TOP
'<path d="m23 12 10 19 5-17 8 17 3-17 6 17 7-19 1 13 6-13" fill="none" stroke="#ffe680"/>',

// SVG_PLAYER_FRONT_BODY_DEAD
'<path d="m31 10c2-8 59-0 55 20-3 20-6 53-18 59-11 5-38-1-51-11-12-9 11-59 14-68z" fill="#f0e0d1" stroke="#917c6f"/>\
<path d="m35 17c16 16 42 11 46 12" fill="none" stroke="#917c6f"/>\
<path d="m21 42c-4 11 6 15 2 28" fill="none" stroke="#000"/>\
<path d="m76 54c5 2-2 16 5 28" fill="none" stroke="#000"/>\
<path transform="matrix(.5 .15879 -.15879 .59407 28 28)" d="m39 31a3 3 0 1 1 -6 0 3 3 0 1 1 6 0z" fill="#483e37" stroke="#483e37"/>\
<path d="m60 38c3 3 4 6 6 10" fill="none" stroke="#483e37"/>\
<path d="m58 46c5-2 7-2 12-3" fill="none" stroke="#483e37"/>\
<path d="m35 32c3 3 4 6 6 10" fill="none" stroke="#483e37"/>\
<path d="m33 39c5-2 5-3 12-3" fill="none" stroke="#483e37"/>'

];