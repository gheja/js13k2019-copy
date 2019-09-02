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
		this.recording = false;
		this.tickRound = 1;
		
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
		
		// deactivate room but onyl when recording, don't replay it
		if (c[CONTROL_ACTION_2][INPUT_KEY_STATE] && c[CONTROL_ACTION_2][INPUT_KEY_CHANGED] && this.recording)
		{
			this.stopRecording();
			_game.deactivateRoom();
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
		
		this.updateCollisions();
		this.updateOverlap();
		
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
	
	startRecording()
	{
		this.recording = true;
		this.recordedControls.length = 0;
	}
	
	stopRecording()
	{
		this.recording = false;
	}
	
	reset()
	{
		this.doubleJumped = false;
		this.recording = false;
		this.defaultReset();
	}
}
