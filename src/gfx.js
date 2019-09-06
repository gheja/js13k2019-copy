"use strict";

class Gfx
{
	constructor(canvasId)
	{
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		
		this.canvas.width = 600;
		this.canvas.height = 600;
	}
	
	clear()
	{
		this.ctx.fillStyle = "#222";
		this.ctx.fillRect(0, 0, 600, 600);
	}
	
	drawDebugRectangle(x, y, width, height, color)
	{
		if (!DEBUG)
		{
			return;
		}
		
		this.ctx.fillStyle = color;
		this.ctx.fillRect((x - width / 2 + 50) * DEBUG_DRAW_SCALE, (y - height / 2 + 50) * DEBUG_DRAW_SCALE, width * DEBUG_DRAW_SCALE, height * DEBUG_DRAW_SCALE);
	}
	
	drawDebugCross(x, y, width, height, color)
	{
		if (!DEBUG)
		{
			return;
		}
		
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 1;
		
		this.ctx.beginPath();
		
		this.ctx.moveTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE + 50) * DEBUG_DRAW_SCALE + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE - height / 2 + 50) * DEBUG_DRAW_SCALE + 0.5);
		this.ctx.lineTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE + 50) * DEBUG_DRAW_SCALE + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE  + height / 2 + 50) * DEBUG_DRAW_SCALE + 0.5);
		
		this.ctx.moveTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE - width / 2 + 50) * DEBUG_DRAW_SCALE + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE  + 50) * DEBUG_DRAW_SCALE + 0.5);
		this.ctx.lineTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE + width / 2 + 50) * DEBUG_DRAW_SCALE + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE  + 50) * DEBUG_DRAW_SCALE + 0.5);
		
		this.ctx.stroke();
	}
	
	drawDebugProgressBar(x, y, width, height, position, color)
	{
		if (!DEBUG)
		{
			return;
		}
		
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x * DEBUG_DRAW_SCALE, y * DEBUG_DRAW_SCALE, (width * position) * DEBUG_DRAW_SCALE, height * DEBUG_DRAW_SCALE);
		this.ctx.fillRect(x * DEBUG_DRAW_SCALE, (y + height - 1) * DEBUG_DRAW_SCALE, width * DEBUG_DRAW_SCALE, 1 * DEBUG_DRAW_SCALE);
	}
}
