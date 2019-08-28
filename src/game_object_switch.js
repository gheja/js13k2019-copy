"use strict";

class GameObjectSwitch extends GameObject
{
	constructor(x, y, group)
	{
		super(x, y, 1, 1, group);
		
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
