"use strict";

class GameObject
{
	// x, y, width, height are integers
	// speedX, speedY are floats -> abs(speed) < 0.5 is ignored
	constructor(x, y, width, height, room)
	{
		// initial position is multiplied
		this.x = Math.round(x * GAME_OBJECT_COORDINATE_SCALE);
		this.y = Math.round(y * GAME_OBJECT_COORDINATE_SCALE);
		this.width = Math.round(width * GAME_OBJECT_COORDINATE_SCALE);
		this.height = Math.round(height * GAME_OBJECT_COORDINATE_SCALE);
		this.room = room;
		this.name = "";
		this.color = "#333";
		this.gravity = false;
		this.collisionActor = false;
		this.collisionTarget = false;
		this.speedX = 0;
		this.speedY = 0;
	}
	
	draw()
	{
		_gfx.drawDebugRectangle(this.x, this.y, this.width, this.height, this.color);
	}
	
	getCollidedObject(dx, dy)
	{
		let objects, x, y, a;
		
		objects = _game.objects;
		
		// calculate where the point to be checked is located
		x = this.x;
		if (dx < 0)
		{
			x -= this.width / 2;
		}
		else if (dx > 0)
		{
			x += this.width / 2;
		}
		
		y = this.y;
		if (dy < 0)
		{
			y -= this.height / 2;
		}
		else if (dy > 0)
		{
			y += this.height / 2;
		}
		
		// check if the point is on any collidable object, return it if any
		for (a of objects)
		{
			if (a == this || !a.collisionTarget)
			{
				continue;
			}
			
			if (
				(a.x - a.width / 2 <= x) &&
				(a.x + a.width / 2 >= x) &&
				(a.y - a.height / 2 <= y) &&
				(a.y + a.height / 2 >= y)
			)
			{
				return a;
			}
		}
		
		return null;
	}
	
	moveAndCheckCollisions()
	{
		let a, b, c, d;
		
		a = Math.round(Math.abs(this.speedX));
		b = this.speedX < 0 ? -1 : 1;
		
		c = Math.round(Math.abs(this.speedY));
		d = this.speedY < 0 ? -1 : 1;
		
		while (a > 0 || c > 0)
		{
			if (a > 0)
			{
				if (!this.getCollidedObject(b, 0))
				{
					this.x += b;
				}
				else
				{
					a = 0;
					b = 0;
					this.speedX = 0;
				}
				
				a--;
			}
			
			if (c > 0)
			{
				if (!this.getCollidedObject(0, d))
				{
					this.y += d;
				}
				else
				{
					c = 0;
					d = 0;
					this.speedY = 0;
				}
				
				c--;
			}
		}
/*
		this.x = this.x + ;
		this.y = this.y + Math.round(this.speedY);
*/
	}
	
	defaultTick()
	{
		if (this.gravity)
		{
			this.speedY += 10 / 60;
		}
		this.moveAndCheckCollisions();
/*
		this.x = this.x + Math.round(this.speedX);
		this.y = this.y + Math.round(this.speedY);
*/
	}
	
	tick()
	{
		this.defaultTick();
	}
}
