"use strict";

class GameObjectSwitch extends GameObject
{
	constructor(x, y, group)
	{
		super(x, y, group);
		
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