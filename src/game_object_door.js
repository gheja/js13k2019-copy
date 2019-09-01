"use strict";

class GameObjectDoor extends GameObject
{
	constructor(x, y, activationGroup)
	{
		super(x, y, 0.2, 1, -1);
		
		if (DEBUG)
		{
			this.color = "#886";
		}
		
		this.collisionTarget = true;
		this.activationGroup = activationGroup;
		this.tickRound = 3;
		
		this.open = false;
	}
	
	tick()
	{
		let a;
		
		this.open = false;
		this.color = "#886";
		
		if (_game.isActivationGroupActive(this.activationGroup))
		{
			this.open = true;
			this.color = "#332";
			// break;
		}
		
		this.collisionTarget = !this.open;
	}
}
