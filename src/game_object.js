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
		this.svgIndex = -1;
		this.svgScale = 1;
		this.gravity = false;
		this.collisionActor = false;
		this.collisionTarget = false;
		this.overlappedObjects = [];
		this.overlappedObjectBlocks = false;
		this.speedX = 0;
		this.speedY = 0;
		this.ticks = 0;
		this.tickRound = 2;
		this.destroyed = false;
		
		this.collidedObjects = [ null, null, null, null ]; // top, right, bottom, left
	}
	
	draw()
	{
		if (this.destroyed)
		{
			return;
		}
		
		if (DEBUG)
		{
			if (this.svgIndex == -1)
			{
				// throw "Invalid shape index.";
				return;
			}
		}
		
		_gfx.drawSvg(this.svgIndex, this.x, this.y, false, this.svgScale);
	}
	
	updateOverlap()
	{
		let a;
		
		function aabb(o1, o2)
		{
			// Thanks super at StackOverflow: https://stackoverflow.com/a/25342644/460571
			return !(
				o1.x + o1.width  / 2 < o2.x - o2.width  / 2 ||
				o1.y + o1.height / 2 < o2.y - o2.height / 2 ||
				o1.x - o1.width  / 2 > o2.x + o2.width  / 2 ||
				o1.y - o1.height / 2 > o2.y + o2.height / 2
			);
		}
		
		this.overlappedObjects.length = 0;
		this.overlappedObjectBlocks = false;
		
		// check if the point is on any collidable object, return it if any
		for (a of _game.objects)
		{
			// don't check collision with ourselves or objects that should not be checked
			if (a == this)
			{
				continue;
			}
			
			if (aabb(this, a))
			{
				this.overlappedObjects.push(a);
				this.overlappedObjectBlocks = this.overlappedObjectBlocks || a.collisionTarget;
				
				// trigger the overlap
				a.overlappedBy(this);
			}
		}
	}
	
	updateCollisions()
	{
		// TODO: currently only checks four points on the edges
		// which leads to intersect when colliding on corners
		
		this.collidedObjects = [
			_game.getObjectAt(this.x,                      this.y - this.height / 2 - 1), // top
			_game.getObjectAt(this.x + this.width / 2 + 1, this.y), // right
			_game.getObjectAt(this.x,                      this.y + this.height / 2 + 1), // bottom
			_game.getObjectAt(this.x - this.width / 2 - 1, this.y), // left
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
			if (a > 0)
			{
				this.x += b;
				
				this.updateOverlap();
				
				if (this.overlappedObjectBlocks)
				{
					this.x -= b;
					a = 0;
					b = 0;
					this.speedX = 0;
				}
				
				a--;
			}
			
			if (c > 0)
			{
				this.y += d;
				
				this.updateOverlap();
				
				if (this.overlappedObjectBlocks)
				{
					this.y -= d;
					c = 0;
					d = 0;
					this.speedY = 0;
				}
				
				c--;
			}
		}
		
		this.updateCollisions();
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
		this.destroyed = false;
	}
	
	reset()
	{
		this.defaultReset();
	}
	
	overlappedBy(obj)
	{
	}
}
