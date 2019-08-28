"use strict";

let _game;

function init()
{
	_game = new Game();
	_game.init();
	_game.loadLevel(_levels[0])
}
