"use strict";

class GameObjectDoor extends GameObject
{
	constructor(x, y, name)
	{
		super(x, y, name);
		
		this.steppedOn = false;
	}
	
	reset()
	{
		this.steppedOn = false;
	}
	
	stepOn()
	{
	}
	
	stepOff()
	{
	}
}