"use strict";

class GameObjectPlayer extends GameObject
{
	constructor(x, y, room)
	{
		super(x, y, 0.4, 0.8, room);
		
		this.color = "#0e4";
		this.gravity = true;
		this.doubleJumped = false;
	}
	
	tick()
	{
		if (_inputControls[CONTROL_UP][INPUT_KEY_STATE] && _inputControls[CONTROL_UP][INPUT_KEY_CHANGED])
		{
			// has ground contact - normal jump
			if (this.collidedObjects[DIRECTION_DOWN])
			{
				this.speedY = -4;
			}
			else
			{
				// has wall contact - wall jump
				if (this.collidedObjects[DIRECTION_LEFT])
				{
					this.speedY = -4;
					this.speedX = 4;
				}
				else if (this.collidedObjects[DIRECTION_RIGHT])
				{
					this.speedY = -4;
					this.speedX = -4;
				}
				else
				{
					// double jump
					if (!this.doubleJumped)
					{
						this.speedY = -4;
						this.doubleJumped = true;
					}
				}
			}
		}
		
		// has ground contact
		if (this.collidedObjects[DIRECTION_DOWN])
		{
			if (_inputControls[CONTROL_LEFT][INPUT_KEY_STATE])
			{
				this.speedX += -4/10;
			}
			
			if (_inputControls[CONTROL_RIGHT][INPUT_KEY_STATE])
			{
				this.speedX += 4/10;
			}
			
			// drag
			this.speedX *= 0.9;
			
			// reset double jump
			this.doubleJumped = false;
		}
		
		// air drag
		this.speedX *= 0.99;
		
		this.defaultTick();
	}
}
