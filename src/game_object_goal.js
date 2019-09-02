"use strict";

class GameObjectGoal extends GameObject
{
	constructor(x, y)
	{
		super(x, y, 0.2, 0.2, -1);
		
		if (DEBUG)
		{
			this.color = "#ea0";
		}
		
		this.collisionTarget = true;
		this.tickRound = 3;
	}
	
	collidedWithPlayer(player)
	{
		_game.win();
	}
}
