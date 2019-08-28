"use strict";

let _game;
let _gfx;

function init()
{
	_gfx = new Gfx("canvas1");
	
	_game = new Game();
	_game.init();
	_game.loadLevel(_levels[0])
}
