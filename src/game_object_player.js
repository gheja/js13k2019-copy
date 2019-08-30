"use strict";

class GameObjectPlayer extends GameObject
{
	constructor(x, y, room)
	{
		super(x, y, 0.5, 0.5, room);
		
		this.color = "#0e4";
		this.gravity = true;
		this.doubleJumped = false;
	}
	
	tick()
	{
		// contact on feet
		if (this.collidedObjects[2])
		{
			if (_input.controls["up"].state && _input.controls["up"].changed)
			{
				this.speedY = -4;
			}
			
			if (_input.controls["left"].state)
			{
				this.speedX += -4/10;
			}
			
			if (_input.controls["right"].state)
			{
				this.speedX += 4/10;
			}
			
			// drag
			this.speedX *= 0.9;
			
			// reset double jump
			this.doubleJumped = false;
		}
		else
		{
			if (_input.controls["up"].state && _input.controls["up"].changed && !this.doubleJumped)
			{
				this.speedY = -4;
				this.doubleJumped = true;
			}
		}
		
		// air drag
		this.speedX *= 0.99;
		
		this.defaultTick();
	}
}
