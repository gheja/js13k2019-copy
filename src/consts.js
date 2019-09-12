"use strict";

const DEBUG = 1;

const OBJ_STARTPOINT = 0;
const OBJ_DOOR = 1;
const OBJ_SWITCH = 2;
const OBJ_GOAL = 3;
// const OBJ_WALL = n + 1;

const GAME_OBJECT_COORDINATE_SCALE = 50;

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

const SVG_FILE_HEADER = '<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width="4">';
const SVG_FILE_FOOTER = '</g></svg>';

const SVG_PLAYER_FRONT_BODY = 0;
const SVG_PLAYER_FRONT_EYES = 1;
const SVG_PLAYER_FRONT_EYES_BLINK = 2;
const SVG_STAR = 3;
const SVG_PLAYER_LEFT_BODY = 4;
const SVG_PLAYER_LEFT_LEGS_RUN1 = 5;
const SVG_PLAYER_LEFT_LEGS_RUN2 = 6;
const SVG_PLAYER_LEFT_LEGS_FLYING = 7;
