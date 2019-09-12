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
				this.speedY = -4.5;
			}
			else
			{
				// has wall contact - wall jump
				if (this.collidedObjects[DIRECTION_LEFT])
				{
					this.speedY = -4.5;
					this.speedX = 4;
				}
				else if (this.collidedObjects[DIRECTION_RIGHT])
				{
					this.speedY = -4.5;
					this.speedX = -4;
				}
				else
				{
					// double jump
					if (!this.doubleJumped)
					{
						this.speedY = -4.5;
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
	
	draw()
	{
// 1: body front
// 2: body front v2
// 3: eye
// 4: eye
// 5: eye anim 1
// 6: eye anim 2
// 7: mouth
// 8: leg front
// 9: leg anim 1
// 10: leg anim 2
// 11: leg anim 3
// 12: body left
		if (Math.round(this.speedX, 2) == 0)
		{
		_gfx.drawShape(_shapes[2], this.x, this.y, 0.8, false);
		
		if (this.ticks % 300 < 190)
		{
			_gfx.drawShape(_shapes[7], this.x, this.y - 5, 0.3, false);
		}
		else
		{
			_gfx.drawShape(_shapes[7], this.x - 1, this.y - 4, 0.3, false);
		}
		
		if (this.ticks % 140 < 130)
		{
			_gfx.drawShape(_shapes[4], this.x - 10, this.y - 10, 0.2, false);
			_gfx.drawShape(_shapes[4], this.x + 10, this.y - 10, 0.2, false);
		}
		else if (this.ticks % 140 < 135)
		{
			_gfx.drawShape(_shapes[5], this.x - 10, this.y - 10, 0.2, false);
			_gfx.drawShape(_shapes[5], this.x + 10, this.y - 10, 0.2, false);
		}
		else
		{
			_gfx.drawShape(_shapes[6], this.x - 10, this.y - 10, 0.2, false);
			_gfx.drawShape(_shapes[6], this.x + 10, this.y - 10, 0.2, false);
		}
		
		_gfx.drawShape(_shapes[8], this.x - 8, this.y + 16, 0.4, false);
		_gfx.drawShape(_shapes[8], this.x + 8, this.y + 16, 0.4, false);
		}
		else
		{
			_gfx.drawShape(_shapes[12], this.x, this.y, 0.8, false);
			_gfx.drawShape(_shapes[5], this.x - 10, this.y - 10, 0.2, false);
			
			if (this.ticks % 18 < 6)
			{
				_gfx.drawShape(_shapes[9], this.x - 2, this.y + 16, 0.2, false);
				_gfx.drawShape(_shapes[10], this.x + 4, this.y + 16, 0.2, false);
			}
			else if (this.ticks % 18 < 12)
			{
				_gfx.drawShape(_shapes[10], this.x - 2, this.y + 16, 0.2, false);
				_gfx.drawShape(_shapes[11], this.x + 4, this.y + 16, 0.2, false);
			}
			else
			{
				_gfx.drawShape(_shapes[11], this.x - 2, this.y + 16, 0.2, false);
				_gfx.drawShape(_shapes[9], this.x + 4, this.y + 16, 0.2, false);
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
