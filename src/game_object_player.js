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
		this.killed = false;
		this.gravity = true;
		this.doubleJumped = false;
		this.recording = false;
		this.tickRound = 1;
		this.drawRound = 3;
		
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
		if (this.killed)
		{
			_gfx.drawSvg(SVG_PLAYER_FRONT_BODY_DEAD, this.x, this.y);
			_gfx.drawSvg(SVG_PLAYER_LEFT_LEGS_RUN1, this.x, this.y);
			return;
		}
		
		if (Math.round(this.speedX, 2) == 0)
		{
			_gfx.drawSvg(SVG_PLAYER_FRONT_BODY, this.x, this.y);
			
			_gfx.drawSvg(this.ticks % 130 < 125 ? SVG_PLAYER_FRONT_EYES : SVG_PLAYER_FRONT_EYES_BLINK, this.x, this.y);
		}
		else
		{
			_gfx.drawSvg(SVG_PLAYER_LEFT_BODY, this.x, this.y, this.speedX > 0);
			
			// has ground contact
			if (this.collidedObjects[DIRECTION_DOWN])
			{
				_gfx.drawSvg(this.ticks % 8 < 4 ? SVG_PLAYER_LEFT_LEGS_RUN1 : SVG_PLAYER_LEFT_LEGS_RUN2, this.x, this.y, this.speedX > 0);
			}
			else
			{
				_gfx.drawSvg(SVG_PLAYER_LEFT_LEGS_FLYING, this.x, this.y, this.speedX > 0);
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
		
		if (c && !this.killed)
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
		this.killed = false;
		this.defaultReset();
	}
}
