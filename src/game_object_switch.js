"use strict";

class GameObjectSwitch extends GameObject
{
	constructor(x, y, activationGroup, room)
	{
		super(x, y + 0.5, 1, 0.2, room);
		
		this.active = false;
		this.collisionTarget = true;
		this.activationGroup = activationGroup;
	}
	
	tick()
	{
		let a;
		
		this.active = false;
		this.color = "#171";
		
		for (a of _game.objects)
		{
			if (a instanceof GameObjectPlayer && a.collidedObjects[DIRECTION_DOWN] == this)
			{
				this.active = true;
			}
		}
		
		if (this.active)
		{
			this.color = "#3c3";
		}
	}
}
