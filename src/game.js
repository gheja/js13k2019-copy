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
		let x, y, a;
		
		function roomLookup(x, y)
		{
			return this.level.roomMap[y * this.level.width + x];
		}
		
		this.level = data;
		this.objects = [];
		
		for (y=0; y<this.level.height; y++)
		{
			for (x=0; x<this.level.width; x++)
			{
				if (this.level[y * this.level.width + x] == 1)
				{
					this.objects.push(new GameObjectWall(x, y));
				}
			}
		}
		
		console.log(this.level);
		
		for (a of this.level.objects)
		{
			console.log(a);
		}
	}
	
	init()
	{
	}
}
