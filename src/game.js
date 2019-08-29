"use strict";

// TODO: optimization for size: use globals instead of properties of
// Game - only one instance will be used anyways

class Game
{
	constructor()
	{
		this.level = null;
		this.objects = [];
	}
	
	loadLevel(data)
	{
		let x, y, a, room;
		
		this.level = data;
		this.objects = [];
		
		for (y=0; y<this.level.height; y++)
		{
			for (x=0; x<this.level.width; x++)
			{
				if (this.level.walls[y * this.level.width + x] == 1)
				{
					this.objects.push(new GameObjectWall(x, y));
				}
			}
		}
		
		for (a of this.level.objects)
		{
			// look up room by coordinates
			room = this.level.roomMap[ a[2] * this.level.width + a[1] ];
			
			if (a[0] == OBJ_STARTPOINT)
			{
				this.objects.push(new GameObjectStartpoint(a[1], a[2], room));
			}
		}
		
		this.objects.push(new GameObjectPlayer(6, 5, 1));
	}
	
	tick()
	{
		let a;
		
		for (a of this.objects)
		{
			a.tick();
		}
		
		_input.acknowledge();
	}
	
	renderFrame()
	{
		let a;
		
		_gfx.clear();
		
		for (a of this.objects)
		{
			a.draw();
		}
	}
	
	frame()
	{
		this.tick();
		this.renderFrame();
		
		_raf(this.frame.bind(this));
	}
	
	init()
	{
		_raf(this.frame.bind(this));
	}
}
