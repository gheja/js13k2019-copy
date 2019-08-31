"use strict";

const DEBUG = 1;

const OBJ_WALL = 1;
const OBJ_STARTPOINT = 2;
const OBJ_DOOR = 3;
const OBJ_SWITCH = 4;

const GAME_OBJECT_COORDINATE_SCALE = 50;
const DEBUG_DRAW_SCALE = 1;

const DIRECTION_UP = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_DOWN = 2;
const DIRECTION_LEFT = 3;

const CONTROL_UP = 0;
const CONTROL_RIGHT = 1;
const CONTROL_DOWN = 2;
const CONTROL_LEFT = 3;
const CONTROL_ACTION_1 = 4;
const CONTROL_ACTION_2 = 5;

const INPUT_KEY_STATE = 0;
const INPUT_KEY_CHANGED = 1;
const INPUT_KEY_EVENTS = 2;

const GAME_MODE_ROOM_SELECT = 0;
const GAME_MODE_ROOM_WAITING = 1;
const GAME_MODE_ROOM_PLAYING = 2;
