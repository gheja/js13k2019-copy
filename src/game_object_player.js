"use strict";

class GameObjectPlayer extends GameObject
{
	constructor(x, y, room)
	{
		super(x, y, 0.4, 0.8, room);
		
		if (DEBUG)
		{
			this.color = "#0e4";
		}
		this.gravity = true;
		this.doubleJumped = false;
		this.recording = true;
		
		this.recordedControls = [];
	}
	
	handleControls(c)
	{
		if (c[CONTROL_UP][INPUT_KEY_STATE] && c[CONTROL_UP][INPUT_KEY_CHANGED])
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
			if (c[CONTROL_LEFT][INPUT_KEY_STATE])
			{
				this.speedX += -4/10;
			}
			
			if (c[CONTROL_RIGHT][INPUT_KEY_STATE])
			{
				this.speedX += 4/10;
			}
		}
	}
	
	tick()
	{
		let c;
		
		if (this.recording)
		{
			this.recordedControls[this.ticks] = _copy(_inputControls);
		}
		
		c = this.recordedControls[this.ticks];
		
		if (c)
		{
			this.handleControls(c);
		}
		
		// has ground contact
		if (this.collidedObjects[DIRECTION_DOWN])
		{
			// drag
			this.speedX *= 0.9;
			
			// reset double jump
			this.doubleJumped = false;
		}
		
		// air drag
		this.speedX *= 0.99;
		
		this.defaultTick();
	}
	
	restart()
	{
		this.ticks = 0;
		this.recording = false;
		this.speedX = 0;
		this.speedY = 0;
		this.x = Math.round(6 * GAME_OBJECT_COORDINATE_SCALE);;
		this.y = Math.round(8 * GAME_OBJECT_COORDINATE_SCALE);;
	}
}
