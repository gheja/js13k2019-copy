"use strict";

var _raf = window.requestAnimationFrame;

function _copy(obj)
{
	return JSON.parse(JSON.stringify(obj));
}

function bindEvent(obj, event, callback)
{
	// TODO: optimize for size: remove else {} as it is for pre-IE9 only
	if (obj.addEventListener)
	{
		obj.addEventListener(event, callback);
	}
	else
	{
		obj.attachEvent("on" + event, callback);
	}
}

// AABB collision/overlap detection
function aabb(o1, o2)
{
	// Thanks super at StackOverflow: https://stackoverflow.com/a/25342644/460571
	return !(
		o1.x + o1.width  / 2 < o2.x - o2.width  / 2 ||
		o1.y + o1.height / 2 < o2.y - o2.height / 2 ||
		o1.x - o1.width  / 2 > o2.x + o2.width  / 2 ||
		o1.y - o1.height / 2 > o2.y + o2.height / 2
	);
}
