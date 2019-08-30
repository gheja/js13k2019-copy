"use strict";

let _gfx;
let _game;

function init()
{
	inputInit();
	
	_gfx = new Gfx("canvas1");
	
	_game = new Game();
	_game.init();
	_game.loadLevel(_levels[0])
}
