"use strict";

const EDITOR_MODE_INACTIVE = 0;
const EDITOR_MODE_WALL = 1;
const EDITOR_MODE_ROOM = 2;
const EDITOR_MODE_OBJECT = 3;

function setCharAtPosition(s, pos, c)
{
	return s.substring(0, pos) + ("" + c) + s.substring(pos + 1);
}

function int(x)
{
	return parseInt(x);
}

class Editor
{
	constructor()
	{
		this.mode = EDITOR_MODE_INACTIVE;
		
		this.level = null;
		
		this.selectedObjectIndex = -1;
		this.highlightedObjectIndex = -1;
		
		this.roomColors = [ "255,0,0", "255,255,0", "0,255,0", "0,255,255", "0,0,255" ];
		
		this.objectPropertyLists = [
			[ "x", "y" ], // OBJ_STARTPOINT == 0
			[ "x", "y", "activationGroup" ], // OBJ_DOOR == 1
			[ "x", "y", "activationGroup", "sticky", "inverted" ], // OBJ_SWITCH == 2
			[ "x", "y" ], // OBJ_GOAL == 3
			[ "x", "y", "direction" ] // OBJ_SPIKE == 4
		];
		
		this.cursorX = 0;
		this.cursorY = 0;
		this.cursorBlockX = 0;
		this.cursorBlockY = 0;
		
		// this.gui = null;
		
		this.controls = [];
		this.controlsDom = null;
		
		this.tool = "play";
		
		this.currentShape = {"points":[[20,0,20,3],[35,10,26,12],[30,27,25,21],[10,27,14,21],[5,10,14,12],[20,0,20,3]],"lineWidth":2,"lineColor":"eebb00","fillColor":"ffee00"};
	}
	
	handleMouseDown(event)
	{
		this.handleMouseMove(event);
		
		event.preventDefault();
		
		if (this.tool == "play")
		{
			return;
		}
		
		// click
		
		if (this.cursorBlockX < 0 || this.cursorBlockY < 0 || this.cursorBlockX >= this.level.width || this.cursorBlockX >= this.level.height)
		{
			return;
		}
		
		let n, m;
		
		n = this.cursorBlockY * this.level.width + this.cursorBlockX;
		
		if (this.tool == "walls")
		{
			if (this.level.walls[n] == "1")
			{
				this.level.walls = setCharAtPosition(this.level.walls, n, "0");
			}
			else
			{
				this.level.walls = setCharAtPosition(this.level.walls, n, "1");
			}
		}
		else if (this.tool == "rooms")
		{
			m = this.level.roomMap[n];
			m = (m + 1) % 3;
			
			this.level.roomMap = setCharAtPosition(this.level.roomMap, n, m);
		}
		else if (this.tool == "objects")
		{
			this.selectedObjectIndex = this.highlightedObjectIndex;
			this.updateObjectSelection();
		}
		else if (this.tool == "shape")
		{
		}
		
		this.sendLevelToGame();
	}
	
	handleMouseUp(event)
	{
		this.handleMouseMove(event);
		
		event.preventDefault();
	}
	
	handleMouseMove(event)
	{
		let i, a;
		
		this.cursorX = (event.clientX - _padX) / _zoom;
		this.cursorY = (event.clientY - _padY) / _zoom;
		this.cursorBlockX = Math.round(this.cursorX / GAME_OBJECT_COORDINATE_SCALE);
		this.cursorBlockY = Math.round(this.cursorY / GAME_OBJECT_COORDINATE_SCALE);
		
		if (this.tool == "objects")
		{
			this.highlightedObjectIndex = -1;
			
			for (i in this.level.objects)
			{
				if (this.level.objects[i][1] == this.cursorBlockX && this.level.objects[i][2] == this.cursorBlockY)
				{
					this.highlightedObjectIndex = i;
				}
			}
		}
		
		event.preventDefault();
	}
	
	handleButtonStopStart()
	{
		if (_game.paused)
		{
			this.play();
		}
		else
		{
			this.stop();
		}
	}
	
	handleButtonNewObject()
	{
		let b, i;
		
		// convert to array - thx https://www.hacksparrow.com/javascript/convert-arguments-to-array.html
		b = Array.prototype.slice.call(arguments);
		
		b = b.slice(0, b.length - 1);
		
		this.level.objects.push(b);
		
		// select the new object immediately
		this.selectedObjectIndex = this.level.objects.length - 1;
		this.updateObjectSelection();
		
		this.sendLevelToGame();
	}
	
	handleButtonDelObject()
	{
		let i, a;
		
		if (this.selectedObjectIndex == -1)
		{
			return;
		}
		
		a = [];
		
		for (i=0; i<this.level.objects.length; i++)
		{
			if (i == this.selectedObjectIndex)
			{
				continue;
			}
			
			a.push(this.level.objects[i]);
		}
		
		this.level.objects = _copy(a);
		
		// unselect it
		this.selectedObjectIndex = -1;
		this.updateObjectSelection();
		
		this.sendLevelToGame();
	}
	
	handleButtonReset()
	{
		if (!window.confirm("Are you sure?"))
		{
			return;
		}
		
		this.level = _copy(_levels[0]);
		this.sendLevelToGame();
		
		this.editedShape = { "points": [ [ 0, 0, 0, 0 ] ], "lineWidth": 1, "lineColor": "ffffff", "fillColor": "cccccc" };
		document.getElementById("editor-export-shape-text").value = JSON.stringify(this.editedShape);
		this.saveShapeToStorage();
	}
	
	handleButtonImport()
	{
		let a;
		
		try
		{
			a = JSON.parse(document.getElementById("editor-export-text").value);
		}
		catch (error)
		{
			alert(error);
			
			return;
		}
		
		this.level = a;
		
		this.sendLevelToGame();
	}
	
	handleButtonExportWindow()
	{
		let a;
		
		a = document.getElementById("editor-export-window");
		
		a.style.display = (a.style.display == "block") ? "none" : "block";
	}
	
	setShapeWindowVisibility(value)
	{
		let a;
		
		a = document.getElementById("editor-export-shape-window");
		
		a.style.display = value ? "block" : "none";
	}
	
	handleButtonTools(tool)
	{
		this.selectedObjectIndex = -1;
		this.highlightedObjectIndex = -1;
		this.controlsDeleteTemporaryObjects();
		
		this.tool = tool;
		
		this.setShapeWindowVisibility(tool == "shape");
	}
	
	handleControlIntegerEvent(event)
	{
		if (event.type == "keydown")
		{
			if (event.key.toLowerCase() == "arrowup" || event.key.toLowerCase() == "arrowright")
			{
				event.target.value = Math.min(int(event.target.value) + 1, event.target.dataset.maxValue);
			}
			else if (event.key.toLowerCase() == "arrowdown" || event.key.toLowerCase() == "arrowleft")
			{
				event.target.value = Math.max(int(event.target.value) - 1, event.target.dataset.minValue);
			}
		}
		
		// update property
		this.level.objects[int(event.target.dataset.objectIndex)][int(event.target.dataset.propertyIndex)] = int(event.target.value);
		
		this.sendLevelToGame();
	}
	
	updateObjectSelection()
	{
		this.controlsDeleteTemporaryObjects();
		
		if (this.selectedObjectIndex != -1)
		{
			this.controlsCreateForObject(this.level.objects[this.selectedObjectIndex], this.selectedObjectIndex);
		}
	}
	
	controlsInit()
	{
		let obj;
		
		obj = document.createElement("div");
		obj.id = "editor-controls";
		obj.className = "editor";
		
		this.controlsDom = obj;
		
		document.body.appendChild(obj);
	}
	
	controlsAddButton(name, title, callback)
	{
		let obj;
		
		obj = document.createElement("button");
		obj.innerHTML = title;
		obj.name = name;
		bindEvent(obj, "click", callback);
		
		this.controlsDom.appendChild(obj);
		this.controls[name] = { label: null, object:  obj };
	}
	
	controlsAddInteger(name, title, index, i, value, min, max, temporary)
	{
		let label, obj;
		
		label = document.createElement("label");
		label.innerHTML = title + ":";
		
		obj = document.createElement("input");
		obj.name = name;
		obj.type = "text";
		obj.value = value;
		obj.dataset.objectIndex = index;
		obj.dataset.propertyIndex = i;
		obj.dataset.temporary = temporary;
		obj.dataset.minValue = min;
		obj.dataset.maxValue = max;
		
		bindEvent(obj, "change", this.handleControlIntegerEvent.bind(this));
		bindEvent(obj, "keypress", this.handleControlIntegerEvent.bind(this));
		bindEvent(obj, "keydown", this.handleControlIntegerEvent.bind(this));
		bindEvent(obj, "scroll", this.handleControlIntegerEvent.bind(this));
		
		this.controlsDom.appendChild(label);
		this.controlsDom.appendChild(obj);
		this.controls[name] = { label: label, object:  obj };
	}
	
	controlsAddSeparator()
	{
		let obj;
		
		obj = document.createElement("hr");
		
		this.controlsDom.appendChild(obj);
		this.controls[name] = { label: null, object:  obj };
	}
	
	controlsCreateForObject(obj, index)
	{
		let i, a;
		
		for (i in this.objectPropertyLists[obj[0]])
		{
			i = int(i); // doh
			
			this.controlsAddInteger("obj_value_" + (i + 1), this.objectPropertyLists[obj[0]][i], index, i + 1, obj[i + 1], 0, 50, true);
		}
	}
	
	controlsDelete(name)
	{
		if (this.controls[name].label)
		{
			this.controlsDom.removeChild(this.controls[name].label);
		}
		
		if (this.controls[name].object)
		{
			this.controlsDom.removeChild(this.controls[name].object);
		}
		
		delete(this.controls[name]);
	}
	
	controlsDeleteTemporaryObjects()
	{
		let i;
		
		for (i in this.controls)
		{
			if (this.controls[i].object.dataset.temporary)
			{
				this.controlsDelete(i);
			}
		}
	}
	
	draw()
	{
		let x, y, m, color, a, color2;
		
		_gfx.drawDebugRectangle(this.cursorX, this.cursorY, 2, 2, "#ff0");
		
		color2 = "";
		
		if (this.tool == "walls")
		{
			color2 = "200,200,200";
		}
		else if (this.tool == "rooms")
		{
			color2 = "200,200,60";
			
			for (y=0; y<this.level.height; y++)
			{
				for (x=0; x<this.level.width; x++)
				{
					m = this.level.roomMap[y * this.level.width + x];
					
					color = this.roomColors[m];
					
					if (color)
					{
						_gfx.drawDebugRectangle(x * GAME_OBJECT_COORDINATE_SCALE, y * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, "rgba(" + color + ",0.2)");
					}
				}
			}
		}
		else if (this.tool == "objects")
		{
			color2 = "60,200,200";
			
			if (this.selectedObjectIndex !== -1)
			{
				a = this.level.objects[this.selectedObjectIndex];
				
				_gfx.drawDebugRectangle(a[1] * GAME_OBJECT_COORDINATE_SCALE, a[2] * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, "rgba(0,255,0,0.5");
			}
			
			if (this.highlightedObjectIndex !== -1)
			{
				a = this.level.objects[this.highlightedObjectIndex];
				
				_gfx.drawDebugRectangle(a[1] * GAME_OBJECT_COORDINATE_SCALE, a[2] * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, "rgba(255,255,0,0.5");
			}
		}
		else if (this.tool == "shape")
		{
			if (document.getElementById("editor-export-shape-draw-inspect").checked)
			{
				_gfx.drawShape(this.currentShape, 0, 0, 5, true);
			}
			else
			{
				_gfx.drawShape(
					this.currentShape,
					document.getElementById("editor-export-shape-draw-x").value * GAME_OBJECT_COORDINATE_SCALE,
					document.getElementById("editor-export-shape-draw-y").value * GAME_OBJECT_COORDINATE_SCALE,
					document.getElementById("editor-export-shape-draw-scale").value,
					false
				);
			}
		}
		
		if (color2 != "")
		{
			for (y=-1; y<this.level.height; y++)
			{
				for (x=-1; x<this.level.width; x++)
				{
					_gfx.drawDebugCross(x * GAME_OBJECT_COORDINATE_SCALE, y * GAME_OBJECT_COORDINATE_SCALE, 0.2 * GAME_OBJECT_COORDINATE_SCALE, 0.2 * GAME_OBJECT_COORDINATE_SCALE, "rgba(" + color2 + ",0.4)");
				}
			}
		}
	}
	
	tick()
	{
/*
		this.updateEditedShape();
*/
	}
	
	updateEditedShape()
	{
		let obj, a, success;
		
		obj = document.getElementById("editor-export-shape-text");
		
		success = false;
		
		try
		{
			a = JSON.parse(obj.value);
			success = true;
		}
		catch (error)
		{
		}
		
		if (!success)
		{
			obj.className = "failed";
			return;
		}
		
		obj.className = "";
		
		this.currentShape = a;
		
		this.saveShapeToStorage();
	}
	
	updateExportWindow()
	{
		document.getElementById("editor-export-text").value = JSON.stringify(this.level);
	}
	
	updateExportShapeWindow(a)
	{
		// // would be nice to show the stored text (to maintain stored formatting) but it needs escaping etc.
		// document.getElementById("editor-export-shape-text").value = a;
		
		document.getElementById("editor-export-shape-text").value = JSON.stringify(this.currentShape);
	}
	
	getLevelFromGame()
	{
		this.level = _copy(_game.level);
		_game.paused = true;
	}
	
	sendLevelToGame()
	{
		this.saveToStorage();
		_game.loadLevel(this.level);
	}
	
	loadFromStorage()
	{
		let a;
		
		a = window.localStorage.getItem("js13k2019:level");
		
		if (!a)
		{
			return;
		}
		
		this.level = JSON.parse(a);
		
		this.updateExportWindow();
	}
	
	saveToStorage()
	{
		window.localStorage.setItem("js13k2019:level", JSON.stringify(this.level));
		
		this.updateExportWindow();
	}
	
	loadShapeFromStorage()
	{
		let a;
		
		a = window.localStorage.getItem("js13k2019:shape");
		
		if (!a)
		{
			return;
		}
		
		this.currentShape = JSON.parse(a);
		
		this.updateExportShapeWindow(a);
	}
	
	saveShapeToStorage()
	{
		// // store the text instead to maintain formatting
		// window.localStorage.setItem("js13k2019:shape", JSON.stringify(this.currentShape));
		
		window.localStorage.setItem("js13k2019:shape", document.getElementById("editor-export-shape-text").value);
	}
	
	a(e)
	{
		console.log(e);
	}
	
	clearGui()
	{
	}
	
	stop()
	{
		this.tool = "walls";
		
		this.controls["tool_walls"].object.disabled = false;
		this.controls["tool_rooms"].object.disabled = false;
		this.controls["tool_objects"].object.disabled = false;
/*
		this.controls["tool_shape"].object.disabled = false;
*/
		
		this.getLevelFromGame();
		
		// restart the game
		_game.loadLevel(this.level);
		
		document.getElementById("canvas-transition").style.display = "none";
	}
	
	play()
	{
		this.tool = "play";
		
		this.controls["tool_walls"].object.disabled = true;
		this.controls["tool_rooms"].object.disabled = true;
		this.controls["tool_objects"].object.disabled = true;
/*
		this.controls["tool_shape"].object.disabled = true;
*/
		this.setShapeWindowVisibility(false);
		
		document.getElementById("canvas-transition").style.display = "block";
		
		_game.paused = false;
	}
	
	initExportImportDom()
	{
		let div, obj;
		
		div = document.createElement("div")
		div.id = "editor-export-window";
		div.className = "editor";
		
		obj = document.createElement("textarea");
		obj.id = "editor-export-text";
		div.appendChild(obj);
		
		obj = document.createElement("button");
		obj.innerHTML = "Import";
		bindEvent(obj, "click", this.handleButtonImport.bind(this));
		div.appendChild(obj);
		
		document.body.appendChild(div);
	}
	
	initExportImportShapeDom()
	{
		let div, obj;
		
		div = document.createElement("div")
		div.id = "editor-export-shape-window";
		div.className = "editor";
		
		obj = document.createElement("textarea");
		obj.id = "editor-export-shape-text";
		div.appendChild(obj);
		
		obj = document.createElement("hr");
		div.appendChild(obj);
		
		obj = document.createElement("label");
		obj.innerHTML = "Draw inspect";
		div.appendChild(obj);
		
		obj = document.createElement("input");
		obj.id = "editor-export-shape-draw-inspect"
		obj.type = "checkbox";
		div.appendChild(obj);
		
		obj = document.createElement("label");
		obj.innerHTML = "Draw scale";
		div.appendChild(obj);
		
		obj = document.createElement("input");
		obj.id = "editor-export-shape-draw-scale"
		obj.type = "text";
		obj.value = "1";
		div.appendChild(obj);
		
		obj = document.createElement("label");
		obj.innerHTML = "Draw X";
		div.appendChild(obj);
		
		obj = document.createElement("input");
		obj.id = "editor-export-shape-draw-x"
		obj.type = "text";
		obj.value = "1";
		div.appendChild(obj);
		
		obj = document.createElement("label");
		obj.innerHTML = "Draw Y";
		div.appendChild(obj);
		
		obj = document.createElement("input");
		obj.id = "editor-export-shape-draw-y"
		obj.type = "text";
		obj.value = "1";
		div.appendChild(obj);
		
		document.body.appendChild(div);
	}
	
	init()
	{
		let obj;
		
		bindEvent(_wallFrontCtx.canvas, "mousemove", this.handleMouseMove.bind(this));
		bindEvent(_wallFrontCtx.canvas, "mousedown", this.handleMouseDown.bind(this));
		bindEvent(_wallFrontCtx.canvas, "mouseup", this.handleMouseUp.bind(this));
		
/*
		this.gui = new dat.gui.GUI();
*/
		
		this.controlsInit();
		this.controlsAddButton("stopstart", "Stop/start", this.handleButtonStopStart.bind(this));
		this.controlsAddButton("exportimport", "Export/import", this.handleButtonExportWindow.bind(this));
		this.controlsAddButton("reset", "Reset", this.handleButtonReset.bind(this));
		this.controlsAddSeparator();
		this.controlsAddButton("tool_walls", "Walls", this.handleButtonTools.bind(this, "walls"));
		this.controlsAddButton("tool_rooms", "Rooms", this.handleButtonTools.bind(this, "rooms"));
		this.controlsAddButton("tool_objects", "Objects", this.handleButtonTools.bind(this, "objects"));
/*
		this.controlsAddButton("tool_shape", "Shape", this.handleButtonTools.bind(this, "shape"));
*/
		this.controlsAddSeparator();
		this.controlsAddButton("obj_1", "+Player", this.handleButtonNewObject.bind(this, OBJ_STARTPOINT, 0, 0));
		this.controlsAddButton("obj_2", "+Door", this.handleButtonNewObject.bind(this, OBJ_DOOR, 0, 0, 1));
		this.controlsAddButton("obj_3", "+Switch", this.handleButtonNewObject.bind(this, OBJ_SWITCH, 0, 0, 1, 0, 0));
		this.controlsAddButton("obj_4", "+Goal", this.handleButtonNewObject.bind(this, OBJ_GOAL, 0, 0));
		this.controlsAddButton("obj_5", "+Spike", this.handleButtonNewObject.bind(this, OBJ_SPIKE, 0, 0, 1));
		this.controlsAddButton("obj_delete", "del", this.handleButtonDelObject.bind(this));
		this.controlsAddSeparator();
		
		this.initExportImportDom();
		this.initExportImportShapeDom();
		
		this.loadFromStorage();
		this.loadShapeFromStorage();
		
		// if load was successful
		if (this.level)
		{
			this.sendLevelToGame();
		}
		
		this.stop();
	}
}
