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
	
	frameStart()
	{
		this.ctx.resetTransform();
		this.ctx.transform(1, 0, 0, 1, _padX, _padY);
		this.ctx.transform(_zoom, 0, 0, _zoom, 0, 0);
		
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
		this.ctx.fillRect((x - width / 2), (y - height / 2), width, height);
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
		
		this.ctx.moveTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE) + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE - height / 2) + 0.5);
		this.ctx.lineTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE) + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE  + height / 2) + 0.5);
		
		this.ctx.moveTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE - width / 2) + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE) + 0.5);
		this.ctx.lineTo((x + 0.5 * GAME_OBJECT_COORDINATE_SCALE + width / 2) + 0.5, (y + 0.5 * GAME_OBJECT_COORDINATE_SCALE) + 0.5);
		
		this.ctx.stroke();
	}
	
	drawDebugProgressBar(x, y, width, height, position, color)
	{
		if (!DEBUG)
		{
			return;
		}
		
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, (width * position), height);
		this.ctx.fillRect(x, (y + height - 1), width, 1);
	}
	
	drawShape(shape, x, y, scale, drawControlPoints)
	{
		let i, a;
		
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		
		this.ctx.save();
		
		// TODO: merge transform()s
		
		this.ctx.transform(1, 0, 0, 1, x, y);
		this.ctx.transform(scale, 0, 0, scale, 0, 0);
		this.ctx.transform(1, 0, 0, 1, -25, -25);
		
		if (DEBUG)
		{
			if (drawControlPoints)
			{
				this.ctx.strokeStyle = "#aaa";
				this.ctx.lineWidth = 0.5;
				this.ctx.setLineDash([ 1, 1 ]);
				this.ctx.rect(0, 0, 50, 50);
				
				this.ctx.setLineDash([ 1, 1 ]);
				
				this.ctx.stroke();
				
				this.ctx.setLineDash([ ]);
			}
			
			// set some odd color as default to easily spot invalid color specs (ctx refuses to change to invalid)
			this.ctx.fillStyle = "#f0f";
			this.ctx.strokeStyle = "#f0f"
		}
		
		this.ctx.transform(1, 0, 0, 1, shape.padY, shape.padX);
		
		
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
	
	drawShapePlaceholder(shape, x, y, scale, drawControlPoints)
	{
		let i, a;
		
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		
		this.ctx.save();
		this.ctx.transform(scale, 0, 0, scale, x, y);
		this.ctx.transform(1, 0, 0, 1, -25, -25);
		
		if (DEBUG)
		{
			this.ctx.beginPath();
			
			this.ctx.strokeStyle = "#aaa";
			this.ctx.lineWidth = 0.5;
			this.ctx.setLineDash([ 1, 1 ]);
			
			this.ctx.rect(0, 0, 50, 50);
			
			this.ctx.stroke();
			
			this.ctx.setLineDash([ ]);
		}
		
		this.ctx.restore();
	}
}
