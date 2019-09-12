"use strict";

class Gfx
{
	constructor(canvasId)
	{
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		
		// array to hold the rendered SVGs
		this.svgImages = [];
		
		this.canvas.width = _canvasWidth;
		this.canvas.height = _canvasHeight;
		
		this.renderSvgs();
	}
	
	frameStart()
	{
		this.ctx.resetTransform();
		
		this.ctx.fillStyle = "#a48";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.ctx.transform(1, 0, 0, 1, _padX, _padY);
		this.ctx.transform(_zoom, 0, 0, _zoom, 0, 0);
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
	
	renderSvgs()
	{
		let a, b;
		
		// render all SVGs to an Image for faster use
		for (a of _svgs)
		{
			b = new Image(50, 50);
			b.src = "data:image/svg+xml," + encodeURIComponent(SVG_FILE_HEADER + a + SVG_FILE_FOOTER);
			this.svgImages.push(b);
		}
	}
	
	drawSvg(svgIndex, x, y, flip)
	{
		this.ctx.save();
		this.ctx.transform(flip ? -1 : 1, 0, 0, 1, x, y);
		
		this.ctx.drawImage(this.svgImages[svgIndex], -25, -25, 50, 50);
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
