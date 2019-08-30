"use strict";

class GameObjectStartpoint extends GameObject
{
	constructor(x, y, room)
	{
		super(x, y, 1, 1, room);
		
		if (DEBUG)
		{
			this.color = "#363";
		}
	}
}
