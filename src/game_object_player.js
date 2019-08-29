"use strict";

class GameObjectPlayer extends GameObject
{
	constructor(x, y, room)
	{
		super(x, y, 0.5, 0.5, room);
		
		this.color = "#0e4";
		this.gravity = true;
	}
}
