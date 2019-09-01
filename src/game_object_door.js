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
		
		for (a of _game.objects)
		{
			if (a instanceof GameObjectSwitch && a.active && a.activationGroup == this.activationGroup)
			{
				this.open = true;
				// break;
			}
		}
		
		if (this.open)
		{
			this.color = "#332";
		}
		
		this.collisionTarget = !this.open;
	}
}
