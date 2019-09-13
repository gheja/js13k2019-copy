"use strict";

class GameObjectSpike extends GameObject
{
	constructor(x, y, directions, room)
	{
		super(x, y, 1, 1, room);
		
		this.directions = directions;
		
		this.svgIndex = SVG_SPIKE_FLOOR;
	}
	
	reset()
	{
		this.defaultReset();
	}
	
	draw()
	{
		if (this.directions & 1)
		{
			_gfx.drawSvg(SVG_SPIKE_FLOOR, this.x, this.y);
			// _gfx.drawDebugRectangle(this.x,  this.y + this.height * 0.33, this.width * 0.6, this.height * 0.25, "#ffff0033");
		}
		
		if (this.directions & 2)
		{
			_gfx.drawSvg(SVG_SPIKE_LEFT, this.x, this.y);
			// _gfx.drawDebugRectangle(this.x - this.width * 0.33,  this.y, this.width * 0.25, this.height * 0.6, "#ffff0033");
		}
		
		if (this.directions & 4)
		{
			_gfx.drawSvg(SVG_SPIKE_TOP, this.x, this.y);
			// _gfx.drawDebugRectangle(this.x,  this.y - this.height * 0.33, this.width * 0.6, this.height * 0.25, "#ffff0033");
		}
	}
	
	tick()
	{
		let a, playerOnThis;
		
		playerOnThis = false;
		
		// check if player is standing on this
		for (a of _game.objects)
		{
			if (!a instanceof GameObjectPlayer)
			{
				continue;
			}
			
			
			// floor
			if (this.directions & 1 && aabb(a, { "x": this.x, "y": this.y + this.height * 0.33, "width": this.width * 0.6, "height": this.height * 0.25 }))
			{
				if (Math.round(a.speedY) > 0)
				{
					a.killed = true;
				}
			}
			
			// left wall
			if (this.directions & 2 && aabb(a, { "x": this.x - this.width * 0.33,  "y": this.y, "width": this.width * 0.25, "height":  this.height * 0.6 }))
			{
				if (Math.round(a.speedX) < 0)
				{
					a.killed = true;
				}
			}
			
			// ceiling
			if (this.directions & 4 && aabb(a, { "x": this.x, "y": this.y - this.height * 0.33, "width": this.width * 0.6, "height": this.height * 0.25 }))
			{
				if (Math.round(a.speedY) < 0)
				{
					a.killed = true;
				}
			}
		}
	}
}
