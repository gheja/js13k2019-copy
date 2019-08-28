"use strict";

class GameObject
{
	// TODO: should x, y, width, height, speedX, speedY be integers to make movement perfectly predictable?
	constructor(x, y, width, height, room)
	{
		this.preciseX = x;
		this.preciseY = y;
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
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
	
	defaultTick()
	{
		this.x = Math.floor(this.preciseX);
		this.y = Math.floor(this.preciseY);
		
/*
		this.x += Math.random() / 10 - 0.05;
		this.y += Math.random() / 10 - 0.05;
*/
	}
	
	tick()
	{
		this.defaultTick();
	}
}
