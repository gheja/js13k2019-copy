"use strict";

class GameObject
{
	// x, y, width, height are integers
	// speedX, speedY are floats -> abs(speed) < 0.5 is ignored
	constructor(x, y, width, height, room)
	{
		// initial position is multiplied
		this.startingX = Math.round(x * GAME_OBJECT_COORDINATE_SCALE);
		this.startingY = Math.round(y * GAME_OBJECT_COORDINATE_SCALE);
		this.x = 0;
		this.y = 0;
		this.width = Math.round(width * GAME_OBJECT_COORDINATE_SCALE);
		this.height = Math.round(height * GAME_OBJECT_COORDINATE_SCALE);
		this.room = room;
		this.name = "";
		if (DEBUG)
		{
			this.color = "#333";
		}
		this.gravity = false;
		this.collisionActor = false;
		this.collisionTarget = false;
		this.speedX = 0;
		this.speedY = 0;
		this.ticks = 0;
		this.tickRound = 2;
		
		this.collidedObjects = [ null, null, null, null ]; // top, right, bottom, left
	}
	
	draw()
	{
		if (DEBUG)
		{
			_gfx.drawDebugRectangle(this.x, this.y, this.width, this.height, this.color);
		}
	}
	
	getCollidedObject(dx, dy)
	{
		let objects, x, y, a;
		
		objects = _game.objects;
		
		// calculate where the point to be checked is located
		x = this.x + dx;
		y = this.y + dy;
		
		// check if the point is on any collidable object, return it if any
		for (a of objects)
		{
			// don't check collision with ourselves or objects that should not be checked
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
	
	updateCollisions()
	{
		// TODO: currently only checks four points on the edges
		// which leads to intersect when colliding on corners
		
		this.collidedObjects = [
			this.getCollidedObject(0, -this.height / 2), // top
			this.getCollidedObject(this.width / 2, 0), // right
			this.getCollidedObject(0, this.height / 2), // bottom
			this.getCollidedObject(-this.width / 2, 0) // left
		];
	}
	
	moveAndCheckCollisions()
	{
		let a, b, c, d;
		
		a = Math.round(Math.abs(this.speedX));
		b = Math.sign(this.speedX);
		
		c = Math.round(Math.abs(this.speedY));
		d = Math.sign(this.speedY);
		
		while (a > 0 || c > 0)
		{
			this.updateCollisions();
			
			if (a > 0)
			{
				if ((b < 0 && !this.collidedObjects[DIRECTION_LEFT]) || (b > 0 && !this.collidedObjects[DIRECTION_RIGHT]))
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
				if ((d < 0 && !this.collidedObjects[DIRECTION_UP]) || (d > 0 && !this.collidedObjects[DIRECTION_DOWN]))
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
	}
	
	defaultTick()
	{
		this.ticks++;
		
		if (this.gravity)
		{
			this.speedY += 10 / 60;
		}
		
		this.moveAndCheckCollisions();
	}
	
	tick()
	{
		this.defaultTick();
	}
	
	defaultReset()
	{
		this.x = this.startingX;
		this.y = this.startingY;
		this.speedX = 0;
		this.speedY = 0;
		this.ticks = 0;
	}
	
	reset()
	{
		this.defaultReset();
	}
}
