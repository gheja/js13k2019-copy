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
		
		// --- wall init
		let tmp;
		
		tmp = document.getElementById("canvas-back");
		tmp.width = _canvasWidth;
		tmp.height = _canvasHeight;
		_wallBackCtx = tmp.getContext("2d");
		
		tmp = document.getElementById("canvas-front");
		tmp.width = _canvasWidth;
		tmp.height = _canvasHeight;
		_wallFrontCtx = tmp.getContext("2d");
	}
	
	clearCtx(ctx)
	{
		ctx.resetTransform();
		
		// ctx.fillStyle = "#a48";
		// ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		ctx.transform(1, 0, 0, 1, _padX, _padY);
		ctx.transform(_zoom, 0, 0, _zoom, 0, 0);
	}
	
	frameStart()
	{
		this.clearCtx(this.ctx);
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
	
	drawWallBlocks()
	{
		let _size;
		
		_size = 50;
		
		function createPattern(h, s, l, dark)
		{
			let canvas, ctx, i;
			
			canvas = document.createElement("canvas");
			ctx = canvas.getContext("2d");
			canvas.width = _size;
			canvas.height = _size;
			
			ctx.fillStyle = "hsla(" + h + "," + s + "%," + l + "%, 1)";
			ctx.fillRect(0, 0, _size, _size);
			
			ctx.fillStyle = "hsla(" + (h + 30) + "," + (s * 0.8) + "%," + l + "%, 1)";
			
			for (i=0; i<4; i++)
			{
				ctx.fillRect(i * (_size/2), 0, 13, _size);
			}
			
			ctx.fillStyle = "rgba(32,32,32," + dark + ")";
			ctx.fillRect(0, 0, _size, _size);
			
			return canvas;
		}
		
		function drawSide(ctx, a, b, c, d, e, f, pattern)
		{
			ctx.save();
// 			ctx.transform(0.5, 0, 0, 0.5, 0, 0);
			ctx.transform(a, b, c, d, e, f);
			ctx.drawImage(pattern, 0, 0);
			ctx.restore();
		}
		
		function drawBlock(x, y, p1, p2, p3)
		{
			x -= 60;
			y -= 33;
			
			// drawSide(1.0,  0.00, -0.5, 0.33, _size     + x, _size   + y, p1); // bottom
			// drawSide(0.5, -0.33,  0.0, 1.00, _size/2   + x, _size/3 + y, p1); // left
			drawSide(_wallFrontCtx, 1.0,  0.00,  0.0, 1.00, _size/2   + x, _size/3 + y, p1); // front
			// drawSide(1.0,  0.00,  0.0, 1.00, _size     + x, 0   + y, p1); // back
			drawSide(_wallBackCtx, 1.0,  0.00, -0.5, 0.33, _size     + x, 0   + y, p2); // top
			drawSide(_wallBackCtx, 0.5, -0.33,  0.0, 1.00, _size*3/2 + x, _size/3 + y, p3); // right
		}
		
		function drawBackground(ctx, x, y, width, height, p4)
		{
			let i, j;
			
			for (i=0; i<width; i++)
			{
				for (j=0; j<height; j++)
				{
					ctx.drawImage(p4, x + i * _size, y + j * _size);
				}
			}
		}
		
		// blocks must be drawn from left-to-right, down-to-up
		function layerSort(a, b)
		{
			if (a.y == b.y)
			{
				return a.x - b.x;
			}
			else
			{
				return b.y - a.y;
			}
		}
		
		
		this.clearCtx(_wallBackCtx);
		this.clearCtx(_wallFrontCtx);
		
		// document.body.style.background = "#111";
		
		let p1 = createPattern(120, 80, 50, 0.2); // front
		let p2 = createPattern(120, 80, 50, 0.0); // front
		let p3 = createPattern(120, 80, 50, 0.4); // front
		let p4 = createPattern(120, 80, 50, 0.7); // front
		
		let i, a, b;
		
		b = [];
		
		for (a of _game.objects)
		{
			if (a instanceof GameObjectWall)
			{
				b.push({ "x": a.x, "y": a.y });
			}
		}
		
		b.sort(layerSort);
		
		drawBackground(_wallBackCtx, 0, 0, 10, 10, p4);
		
		for (a of b)
		{
			drawBlock(a.x, a.y, p1, p2, p3);
		}
	}
}

