"use strict";

let _gfx;
let _input;
let _game;

function init()
{
	_gfx = new Gfx("canvas1");
	
	_input = new Input();
	
	_game = new Game();
	_game.init();
	_game.loadLevel(_levels[0])
}
