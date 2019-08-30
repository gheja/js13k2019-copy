"use strict";

class GameObjectWall extends GameObject
{
	constructor(x, y)
	{
		super(x, y, 1, 1, -1);
		
		if (DEBUG)
		{
			this.color = "#666";
		}
		
		this.collisionTarget = true;
	}
}
