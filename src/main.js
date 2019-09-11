"use strict";

let _gfx;
let _game;
let _editor;
let _zoom = 1;
let _padX = 50; // pixels
let _padY = 50; // pixels

function init()
{
	inputInit();
	
	_gfx = new Gfx("canvas1");
	
	_game = new Game();
	_game.init();
	_game.loadLevel(_levels[0])
	
	_editor = new Editor();
	_editor.init();
}
