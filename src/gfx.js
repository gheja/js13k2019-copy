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
	
	drawShape(shape, x, y, scale, drawControlPoints)
	{
		let i, a;
		
		this.ctx.lineCap = "round";
		
		this.ctx.save();
		this.ctx.transform(1, 0, 0, 1, -16, -16);
		this.ctx.transform(scale, 0, 0, scale, x, y);
		
		
		this.ctx.beginPath();
		
		////
		this.ctx.moveTo(shape.points[0][0], shape.points[0][1]);
		
		for (i=1; i<shape.points.length; i++)
		{
			this.ctx.bezierCurveTo(shape.points[i - 1][2], shape.points[i - 1][3], shape.points[i][2], shape.points[i][3], shape.points[i][0], shape.points[i][1]);
		}
		////
		
		if (shape.fillColor)
		{
			this.ctx.fillStyle = "#" + shape.fillColor;
			this.ctx.fill();
		}
		
		if (shape.lineColor)
		{
			this.ctx.strokeStyle = "#" + shape.lineColor;
			this.ctx.lineWidth = shape.lineWidth;
			this.ctx.stroke();
		}
		
		if (DEBUG)
		{
			if (drawControlPoints)
			{
				this.ctx.beginPath();
				
				for (i=0; i<shape.points.length; i++)
				{
					this.ctx.moveTo(shape.points[i][0], shape.points[i][1]);
					this.ctx.lineTo(shape.points[i][2], shape.points[i][3]);
				}
				
				this.ctx.strokeStyle = "#aaa";
				this.ctx.lineWidth = 0.5;
				this.ctx.setLineDash([ 1, 1 ]);
				this.ctx.stroke();
				
				this.ctx.setLineDash([ ]);
			}
		}
		
		this.ctx.restore();
	}
}
