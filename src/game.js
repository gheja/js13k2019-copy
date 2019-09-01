"use strict";

// TODO: optimization for size: use globals instead of properties of
// Game - only one instance will be used anyways

class Game
{
	constructor()
	{
		this.level = null;
		this.objects = [];
		this.activeRoomIndex = -1;
		this.highlightedRoomIndex = 0;
		this.roomCount = 2;
		this.mode = GAME_MODE_ROOM_SELECT;
		this.ticks = 0;
	}
	
	setHint(status, hintArrows, hintAction1, hintAction2)
	{
		document.getElementById("hint").innerHTML = status + "<br/><b>[Arrows/WASD/Space]</b> " + hintArrows + " &middot; <b>[1]</b> " + hintAction1 + " &middot; <b>[2]</b> " + hintAction2;
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
				this.objects.push(new GameObjectPlayer(a[1], a[2], room));
			}
			else if (a[0] == OBJ_DOOR)
			{
				this.objects.push(new GameObjectDoor(a[1], a[2], a[3], room));
			}
			else if (a[0] == OBJ_SWITCH)
			{
				this.objects.push(new GameObjectSwitch(a[1], a[2], a[3], room));
			}
		}
		
		
		for (a of this.objects)
		{
			a.reset();
		}
	}
	
	handleRoomSelectInput()
	{
		if ((_inputControls[CONTROL_UP][INPUT_KEY_STATE] && _inputControls[CONTROL_UP][INPUT_KEY_CHANGED]) || (_inputControls[CONTROL_LEFT][INPUT_KEY_STATE] && _inputControls[CONTROL_LEFT][INPUT_KEY_CHANGED]))
		{
			this.highlightedRoomIndex = (this.highlightedRoomIndex + this.roomCount - 1) % this.roomCount;
		}
		
		if ((_inputControls[CONTROL_DOWN][INPUT_KEY_STATE] && _inputControls[CONTROL_DOWN][INPUT_KEY_CHANGED]) || (_inputControls[CONTROL_RIGHT][INPUT_KEY_STATE] && _inputControls[CONTROL_RIGHT][INPUT_KEY_CHANGED]))
		{
			this.highlightedRoomIndex = (this.highlightedRoomIndex + 1) % this.roomCount;
		}
		
		if ((_inputControls[CONTROL_ACTION_1][INPUT_KEY_STATE] && _inputControls[CONTROL_ACTION_1][INPUT_KEY_CHANGED]))
		{
			this.mode = GAME_MODE_ROOM_WAITING;
			this.activeRoomIndex = this.highlightedRoomIndex;
		}
	}
	
	handleRoomWaitingInput()
	{
		if ((_inputControls[CONTROL_ACTION_2][INPUT_KEY_STATE] && _inputControls[CONTROL_ACTION_2][INPUT_KEY_CHANGED]))
		{
			this.deactivateRoom();
		}
	}
	
	drawRoomHighlights()
	{
		let x, y, a, room, color;
		
		for (y=0; y<this.level.height; y++)
		{
			for (x=0; x<this.level.width; x++)
			{
				if (this.level.walls[y * this.level.width + x] != 0)
				{
					continue;
				}
				
				color = null;
				
				if (this.level.roomMap[y * this.level.width + x] == this.activeRoomIndex)
				{
					if (this.mode == GAME_MODE_ROOM_PLAYING)
					{
						color = "0,255,0";
					}
					else
					{
						color = "255,255,0";
					}
				}
				else if (this.level.roomMap[y * this.level.width + x] == this.highlightedRoomIndex)
				{
					color = "255,255,255";
				}
				
				if (color)
				{
					_gfx.drawDebugRectangle(x * GAME_OBJECT_COORDINATE_SCALE, y * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, 1 * GAME_OBJECT_COORDINATE_SCALE, "rgba(" + color + ",0.15)");
				}
			}
		}
	}
	
	deactivateRoom()
	{
		this.activeRoomIndex = -1;
		this.mode = GAME_MODE_ROOM_SELECT;
	}
	
	resetRoom(index)
	{
		let a;
		
		if (this.activeRoomIndex == index)
		{
			if (this.mode == GAME_MODE_ROOM_WAITING)
			{
				this.mode = GAME_MODE_ROOM_PLAYING;
			}
			else if (this.mode == GAME_MODE_ROOM_PLAYING)
			{
				this.deactivateRoom();
			}
		}
		
		for (a of this.objects)
		{
			if (a.room == index)
			{
				a.reset();
				
				if (this.activeRoomIndex == index)
				{
					if (a instanceof GameObjectPlayer)
					{
						a.startRecording();
					}
				}
			}
		}
	}
	
	tick()
	{
		let a, i;
		
		this.ticks++;
		
		for (a in this.level.times)
		{
			if (this.ticks % this.level.times[a][0] == this.level.times[a][1])
			{
				this.resetRoom(a);
			}
		}
		
		for (i=0; i<=3; i++)
		{
			for (a of this.objects)
			{
				if (a.tickRound == i)
				{
					a.tick();
				}
			}
		}
		
		if (this.mode == GAME_MODE_ROOM_SELECT)
		{
			this.setHint("Select a room to play", "Toggle rooms", "Play", "(none)");
			this.handleRoomSelectInput();
		}
		else if (this.mode == GAME_MODE_ROOM_WAITING)
		{
			this.setHint("Wait...", "(none)", "(none)", "Cancel");
			this.handleRoomWaitingInput();
		}
		else
		{
			this.setHint("Play this room", "Walk/jump", "(none)", "Finished");
		}
		
		inputAcknowledge();
	}
	
	renderFrame()
	{
		let a;
		
		if (DEBUG)
		{
			_gfx.clear();
		}
		
		for (a of this.objects)
		{
			a.draw();
		}
		
		this.drawRoomHighlights();
		
		a = (this.ticks % this.level.times[0][0]) / this.level.times[0][0];
		_gfx.drawDebugProgressBar(390, 80, 80, 5, a, "#ccc");
		
		a = (this.ticks % this.level.times[1][0]) / this.level.times[1][0];
		_gfx.drawDebugProgressBar(390, 280, 80, 5, a, "#ccc");
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
