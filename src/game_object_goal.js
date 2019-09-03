"use strict";

class GameObjectGoal extends GameObject
{
	constructor(x, y, room)
	{
		super(x, y, 0.2, 0.2, room);
		
		if (DEBUG)
		{
			this.color = "#ea0";
		}
		
		this.collisionTarget = false;
		this.tickRound = 3;
	}
	
	overlappedBy(obj)
	{
		_game.win();
		this.destroyed = true;
	}
}
